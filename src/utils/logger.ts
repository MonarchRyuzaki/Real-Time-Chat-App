import morgan from "morgan";
import { createLogger, format, transports } from "winston";
const isProd = process.env.NODE_ENV === "production";

export const logger = createLogger({
  level: isProd ? "info" : "debug",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY hh:mm:ss.SSS A",
    }),
    isProd ? format.json() : format.combine(format.colorize(), format.simple()),
    format.errors({ stack: true })
  ),
  exceptionHandlers: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.json()
      ),
    }),
  ],
  rejectionHandlers: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.json()
      ),
    }),
  ],
  defaultMeta: { service: "express-starter" },
  transports: [new transports.Console()],
});

export const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res) || "0"),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(
        tokens["response-time"](req, res) || "0"
      ),
    });
  },
  {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  }
);
