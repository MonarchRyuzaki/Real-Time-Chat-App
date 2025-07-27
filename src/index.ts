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

    // Initialize database connections
    await initializeDatabases();

    // Start HTTP server
    await startHttpServer();

    // Start WebSocket server
    await startWebSocketServer();

    logger.info("✅ All services started successfully");

    // Setup graceful shutdown handlers
    setupShutdownHandlers();
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    await gracefulShutdown();
    process.exit(1);
  }
}

async function initializeDatabases(): Promise<void> {
  // Initialize Cassandra
  logger.info("🔌 Connecting to Cassandra database...");
  try {
    await initializeCassandraClient();
    logger.info("✅ Cassandra client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Cassandra:", error);
    throw new Error("Cassandra connection failed - cannot start server");
  }

  // Initialize Prisma
  logger.info("🔌 Connecting to Prisma database...");
  try {
    await initializePrismaClient();
    logger.info("✅ Prisma client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Prisma:", error);
    throw new Error("Prisma connection failed - cannot start server");
  }
}

async function startHttpServer(): Promise<void> {
  try {
    const app = createHttpServer();
    const httpServer = app.listen(PORT, () => {
      logger.info(`🚀 HTTP Server is running on port ${PORT}`);
      logger.info(
        `🏥 Health check available at http://localhost:${PORT}/health`
      );
      logger.info(`📚 API routes available at http://localhost:${PORT}/api`);
    });

    httpServer.on("error", (error) => {
      logger.error("HTTP Server error:", error);
    });
  } catch (error) {
    logger.error("❌ Failed to start HTTP server:", error);
    throw new Error("HTTP server startup failed");
  }
}

async function startWebSocketServer(): Promise<void> {
  try {
    createWebSocketServer({ port: WS_PORT, handler: chatHandler });
    logger.info(`🔌 WebSocket server started on port ${WS_PORT}`);
  } catch (error) {
    logger.error("❌ Failed to start WebSocket server:", error);
    throw new Error("WebSocket server startup failed");
  }
}

function setupShutdownHandlers(): void {
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
}

async function gracefulShutdown() {
  logger.info("🛑 Shutting down server gracefully...");

  const shutdownPromises = [
    closeCassandraClient().catch((error) => {
      logger.error("Error closing Cassandra client:", error);
    }),
    closePrismaClient().catch((error) => {
      logger.error("Error closing Prisma client:", error);
    }),
  ];

  try {
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

startServer().catch((error) => {
  logger.error("❌ Fatal error starting server:", error);
  process.exit(1);
});
