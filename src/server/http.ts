import express from "express";
import { corsMiddleware } from "../middlewares/cors";
import {
  globalErrorHandler,
  notFoundHandler,
} from "../middlewares/errorHandler";
// import routes from "../routes";
import { morganMiddleware } from "../utils/logger";

export function createHttpServer() {
  const app = express();

  // Middlewares
  app.use(corsMiddleware);
  app.use(morganMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API routes
//   app.use("/api", routes);

  // Error handlers
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}
