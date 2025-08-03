import dotenv from "dotenv";
import { logger } from "./utils/logger";
import cluster from "cluster";
import os from "os";
import { initializeDatabases, startHttpServer, startWebSocketServers } from "./utils/startup";
import { gracefulShutdown, setupShutdownHandlers } from "./utils/shutdown";
dotenv.config();

const numCPUs = os.cpus().length;

export const PORT = 3000;
export const WS_CHAT_PORT = 4000;
export const WS_PRESENCE_PORT = 4001;

async function startServer() {
  try {
    logger.info("🚀 Starting Real-Time Chat Application...");

    await initializeDatabases();

    await startHttpServer();

    await startWebSocketServers();

    logger.info("✅ All services started successfully");

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
