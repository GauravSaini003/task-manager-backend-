export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Runs when no route matched
export const notFound = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

// Every error in the app ends up here (4 arguments = Express error handler)
export const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Email already registered';
  }
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid id';
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }
  if (statusCode === 500) {
    message = 'Something went wrong';
  }

  res.status(statusCode).json({ success: false, message });
};
