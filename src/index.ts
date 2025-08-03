import cluster from "cluster";
import dotenv from "dotenv";
import os from "os";
import { logger } from "./utils/logger";
import { gracefulShutdown, setupShutdownHandlers } from "./utils/shutdown";
import {
  initializeDatabases,
  startHttpServer,
  startWebSocketServers,
} from "./utils/startup";
dotenv.config();

const numCPUs = os.cpus().length;

export const PORT = 3000;
export const WS_CHAT_PORT = 4000;
export const WS_PRESENCE_PORT = 4001;

async function startServer() {
  try {
    logger.info("🚀 Starting Real-Time Chat Application...");
    logger.info(`🚀 Worker ${process.pid} is starting...`);
    await initializeDatabases();

    await startHttpServer();

    await startWebSocketServers();

    logger.info("✅ All services started successfully");
    logger.info(`✅ Worker ${process.pid} started all services successfully.`);
    setupShutdownHandlers();
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    await gracefulShutdown();
    process.exit(1);
  }
}

if (cluster.isPrimary) {
  logger.info(`👑 Primary ${process.pid} is running`);
  logger.info(`Forking for ${numCPUs} CPU cores...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(
      `Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`
    );
    logger.info("Starting a new worker...");
    cluster.fork();
  });
} else {
  startServer().catch((error) => {
    logger.error("❌ Fatal error starting server:", error);
    process.exit(1);
  });
}
  