import dotenv from "dotenv";
import { createHttpServer } from "./server/http";
import { logger } from "./utils/logger";
dotenv.config();

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

async function startServer() {
  try {
    const app = createHttpServer();
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(
        `🏥 Health check available at http://localhost:${PORT}/health`
      );
      logger.info(`📚 API routes available at http://localhost:${PORT}/api`);
    });

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);``
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  logger.info("Received shutdown signal, closing server...");
  process.exit(0);
}

startServer();
