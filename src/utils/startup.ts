import { PORT, WS_CHAT_PORT, WS_PRESENCE_PORT } from "..";
import { getOfflineQueue } from "../queue/offlineQueue";
import { createHttpServer } from "../server/http";
import { createWebSocketServer } from "../server/ws";
import { initializeCassandraClient } from "../services/cassandra";
import {
  chatConnectionManager,
  presenceConnectionManager,
} from "../services/connectionService";
import { connectToIoRedis } from "../services/ioredis";
import { prisma } from "../services/prisma";
import { connectToRedis } from "../services/redis";
import { chatHandler } from "../sockets/chatHandler";
import { presenceHandler } from "../sockets/presenceHandler";
import { logger } from "./logger";

export async function startWebSocketServers(): Promise<void> {
  try {
    createWebSocketServer({
      port: WS_CHAT_PORT,
      handler: chatHandler,
      connectionManager: chatConnectionManager,
    });
    logger.info(`🔌 Chat WebSocket server started on port ${WS_CHAT_PORT}`);

    createWebSocketServer({
      port: WS_PRESENCE_PORT,
      handler: presenceHandler,
      connectionManager: presenceConnectionManager,
    });
    logger.info(
      `👁️ Presence WebSocket server started on port ${WS_PRESENCE_PORT}`
    );
  } catch (error) {
    logger.error("❌ Failed to start WebSocket servers:", error);
    throw new Error("WebSocket servers startup failed");
  }
}

export async function initializeDatabases(): Promise<void> {
  logger.info("🔌 Connecting to Cassandra database...");
  try {
    await initializeCassandraClient();
    logger.info("✅ Cassandra client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Cassandra:", error);
    throw new Error("Cassandra connection failed - cannot start server");
  }

  logger.info("🔌 Connecting to Prisma database...");
  try {
    await prisma.$connect();
    logger.info("✅ Prisma client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Prisma:", error);
    throw new Error("Prisma connection failed - cannot start server");
  }

  logger.info("🔌 Connecting to Redis...");
  try {
    await connectToRedis();
    logger.info("✅ Redis client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Redis:", error);
    throw new Error("Redis connection failed - cannot start server");
  }

  logger.info("🔌 Connecting to Io Redis...");
  try {
    await connectToIoRedis();
    logger.info("✅ Redis client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Redis:", error);
    throw new Error("Redis connection failed - cannot start server");
  }

  logger.info("🔌 Connecting to Offline Messages Queue...");
  try {
    await getOfflineQueue();
    logger.info("✅ Redis client connected successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to Redis:", error);
    throw new Error("Redis connection failed - cannot start server");
  }
}

export async function startHttpServer(): Promise<void> {
  try {
    const app = createHttpServer();
    const httpServer = app.listen(PORT, () => {
      logger.info(`🌐 HTTP server started on port ${PORT}`);
    });

    httpServer.on("error", (error) => {
      logger.error("HTTP Server error:", error);
    });
  } catch (error) {
    logger.error("❌ Failed to start HTTP server:", error);
    throw new Error("HTTP server startup failed");
  }
}
