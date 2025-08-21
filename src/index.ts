import dotenv from "dotenv";
import { FLUSH_INTERVAL, flushOfflineMessages } from "./queue/offlineWorker";
import { createConsumer, startWorker } from "./redis/chatMessagesStreams";
import { logger } from "./utils/logger";
import { gracefulShutdown, setupShutdownHandlers } from "./utils/shutdown";
import {
  initializeDatabases,
  startHttpServer,
  startWebSocketServers,
} from "./utils/startup";
dotenv.config();

export const PORT = 3000;
export const WS_CHAT_PORT = 4000;
export const WS_PRESENCE_PORT = 5000;

async function startServer() {
  try {
    logger.info("🚀 Starting Real-Time Chat Application...");
    logger.info(`🚀 Server ${process.pid} is starting...`);
    await initializeDatabases();

    await startHttpServer();

    await startWebSocketServers();

    const workerData = await createConsumer();

    setInterval(flushOfflineMessages, FLUSH_INTERVAL);
    setInterval(() => startWorker(workerData), 2000);

    logger.info("✅ All services started successfully");
    logger.info(`✅ Server ${process.pid} started all services successfully.`);
    setupShutdownHandlers();
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    await gracefulShutdown();
    process.exit(1);
  }
}

startServer().catch((error) => {
  logger.error("❌ Fatal error starting server:", error);
  process.exit(1);
});
