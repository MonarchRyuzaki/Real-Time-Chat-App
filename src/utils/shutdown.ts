import { closeAllWebSocketServers } from "../server/ws";
import { closeCassandraClient } from "../services/cassandra";
import {
  chatConnectionManager,
  presenceConnectionManager,
} from "../services/connectionService";
import { closePrismaClient } from "../services/prisma";
import { disconnectFromRedis } from "../services/redis";
import { logger } from "./logger";

export function setupShutdownHandlers(): void {
  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", gracefulShutdown);
  process.on("uncaughtException", (error) => {
    // logger.error("❌ Uncaught Exception:", error);
    gracefulShutdown();
  });
  process.on("unhandledRejection", (reason, promise) => {
    // logger.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    gracefulShutdown();
  });
}

export async function gracefulShutdown() {
  logger.info("🛑 Shutting down server gracefully...");

  try {
    logger.info("Closing WebSocket servers...");
    await closeAllWebSocketServers();
  } catch (error) {
    logger.error("Error closing WebSocket servers:", error);
  }

  try {
    logger.info("Closing WebSocket connections...");
    chatConnectionManager.closeAllConnections();
    presenceConnectionManager.closeAllConnections();
  } catch (error) {
    logger.error("Error closing WebSocket connections:", error);
  }

  const shutdownPromises = [
    closeCassandraClient().catch((error) => {
      logger.error("Error closing Cassandra client:", error);
    }),
    closePrismaClient().catch((error) => {
      logger.error("Error closing Prisma client:", error);
    }),
  ];

  try {
    await Promise.all(shutdownPromises);
    await disconnectFromRedis();

    logger.info("✅ All services closed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("❌ Error during shutdown:", error);
    logger.info("🔪 Forcing shutdown...");
    process.exit(1);
  }
}
