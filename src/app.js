import dotenv from "dotenv";
import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/error_handler.js";
import { morganMiddleware } from "./utils/logger.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(corsMiddleware);
app.use(morganMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("*", notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
