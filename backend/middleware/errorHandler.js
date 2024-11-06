// errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Log error stack trace for debugging
  console.error('Error:', err);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Determine error message
  const message = err.message || 'An unexpected error occurred';

  // Prepare error response object
  const errorResponse = {
    message,
  };

  // Include stack trace in development environment
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
