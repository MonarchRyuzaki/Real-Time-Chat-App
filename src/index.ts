import dotenv from "dotenv";
import { createHttpServer } from "./server/http";
import { createWebSocketServer } from "./server/ws";
import {
  closeCassandraClient,
  initializeCassandraClient,
} from "./services/cassandra";
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

    // const app = createHttpServer();
    // app.listen(PORT, () => {
    //   logger.info(`🚀 Server is running on port ${PORT}`);
    //   logger.info(
    //     `🏥 Health check available at http://localhost:${PORT}/health`
    //   );
    //   logger.info(`📚 API routes available at http://localhost:${PORT}/api`);
    // });
    createWebSocketServer({ port: 4000, handler: chatHandler });

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  logger.info("Received shutdown signal, closing server...");
  try {
    logger.info("🔌 Closing Cassandra connection...");
    await closeCassandraClient();
    logger.info("✅ Cassandra connection closed");
  } catch (error) {
    logger.error("Error closing Cassandra connection:", error);
  }
  process.exit(0);
}

startServer();
