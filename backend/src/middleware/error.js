import AppError from "../utils/AppError.js";

export const notFound = (req, res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404));
};

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ");
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value";
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Not authorized, token invalid";
  }

  if (statusCode >= 500) {
    console.error(err);
    message = "Something went wrong";
  }

  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message,
  });
};

export default errorMiddleware;
