export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const globalErrorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
};
