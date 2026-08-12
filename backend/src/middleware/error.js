const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
