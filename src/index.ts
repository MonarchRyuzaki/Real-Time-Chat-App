import dotenv from "dotenv";
import { createHttpServer } from "./server/http";
import { createWebSocketServer } from "./server/ws";
import {
  closeCassandraClient,
  initializeCassandraClient,
} from "./services/cassandra";
import { closePrismaClient, initializePrismaClient } from "./services/prisma";
import { chatHandler } from "./sockets/chatHandler";
import { logger } from "./utils/logger";
dotenv.config();

const PORT = 3000;
const WS_PORT = 4000;

async function startServer() {
  try {
    logger.info("🚀 Starting Real-Time Chat Application...");

    // Initialize Cassandra client first
    try {
      logger.info("🔌 Connecting to Cassandra database...");
      await initializeCassandraClient();
      logger.info("✅ Cassandra client connected successfully");
    } catch (cassandraError) {
      logger.error("❌ Failed to connect to Cassandra:", cassandraError);
      throw new Error("Cassandra connection failed - cannot start server");
    }

    // Initialize Prisma client
    try {
      logger.info("🔌 Connecting to Prisma database...");
      await initializePrismaClient();
      logger.info("✅ Prisma client connected successfully");
    } catch (prismaError) {
      logger.error("❌ Failed to connect to Prisma:", prismaError);
      throw new Error("Prisma connection failed - cannot start server");
    }

    // Create and start HTTP server
    try {
      const app = createHttpServer();
      const httpServer = app.listen(PORT, () => {
        logger.info(`🚀 HTTP Server is running on port ${PORT}`);
        logger.info(
          `🏥 Health check available at http://localhost:${PORT}/health`
        );
        logger.info(`📚 API routes available at http://localhost:${PORT}/api`);
      });

      // Handle HTTP server errors
      httpServer.on("error", (error) => {
        logger.error("HTTP Server error:", error);
      });
    } catch (httpError) {
      logger.error("❌ Failed to start HTTP server:", httpError);
      throw new Error("HTTP server startup failed");
    }

    // Create and start WebSocket server
    try {
      createWebSocketServer({ port: WS_PORT, handler: chatHandler });
      logger.info(`🔌 WebSocket server started on port ${WS_PORT}`);
    } catch (wsError) {
      logger.error("❌ Failed to start WebSocket server:", wsError);
      throw new Error("WebSocket server startup failed");
    }

    logger.info("✅ All services started successfully");

    // Set up graceful shutdown handlers
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
    process.on("uncaughtException", (error) => {
      logger.error("❌ Uncaught Exception:", error);
      gracefulShutdown();
    });
    process.on("unhandledRejection", (reason, promise) => {
      logger.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown();
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    await gracefulShutdown();
    process.exit(1);
  }
}

async function gracefulShutdown() {
  logger.info("🛑 Shutting down server gracefully...");

  const shutdownPromises = [];

  // Close Cassandra connection
  try {
    shutdownPromises.push(
      closeCassandraClient().catch((error) => {
        logger.error("Error closing Cassandra client:", error);
      })
    );
  } catch (error) {
    logger.error("Error initiating Cassandra shutdown:", error);
  }

  // Close Prisma connection
  try {
    shutdownPromises.push(
      closePrismaClient().catch((error) => {
        logger.error("Error closing Prisma client:", error);
      })
    );
  } catch (error) {
    logger.error("Error initiating Prisma shutdown:", error);
  }

  try {
    // Wait for all shutdown operations to complete with a timeout
    await Promise.race([
      Promise.all(shutdownPromises),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Shutdown timeout")), 10000)
      ),
    ]);

    logger.info("✅ All database connections closed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Error during shutdown:", error);
    logger.info("🔪 Forcing shutdown...");
    process.exit(1);
  }
}

// Start the server
startServer().catch((error) => {
  logger.error("❌ Fatal error starting server:", error);
  process.exit(1);
});
