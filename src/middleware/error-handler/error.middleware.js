// Error handling middleware requires 4 arguments
function globalErrorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  console.error(error);
  res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      statusCode,
      message: error.message,
    },
  });
}

export default globalErrorHandler;
