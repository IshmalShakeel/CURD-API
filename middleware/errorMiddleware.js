const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
