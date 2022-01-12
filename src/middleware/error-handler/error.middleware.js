import logger from '../../logs/logger.js';

// Error handling middleware requires 4 arguments
function globalErrorHandler(error, _req, res, _next) {
  logger.error(error);
  const statusCode = error.statusCode || 500;
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
