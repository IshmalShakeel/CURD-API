const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);


// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints: http://localhost:${PORT}/api/users`);
});

module.exports = app;