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

async function startServer() {
  try {
    // Initialize Cassandra client first
    logger.info("🔌 Connecting to Cassandra database...");
    await initializeCassandraClient();
    logger.info("✅ Cassandra client connected successfully");

    // Initialize Prisma client
    logger.info("🔌 Connecting to Prisma database...");
    await initializePrismaClient();
    logger.info("✅ Prisma client connected successfully");

    const app = createHttpServer();
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(
        `🏥 Health check available at http://localhost:${PORT}/health`
      );
      logger.info(`📚 API routes available at http://localhost:${PORT}/api`);
    });
    createWebSocketServer({ port: 4000, handler: chatHandler });

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  logger.info("🛑 Shutting down server gracefully...");

  try {
    await closeCassandraClient();
    await closePrismaClient();
    logger.info("✅ All database connections closed");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown:", error);
    process.exit(1);
  }
}

startServer();
