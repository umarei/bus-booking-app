// backend/app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const rateLimiter = require('./middleware/rateLimiter');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Adds security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON requests

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1-hour session expiration
}));

// Rate Limiting (apply to all routes)
app.use(rateLimiter);

// Root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Bus Booking App API!');
});

// API Routes
app.use('/api', apiRoutes); // Consolidated API routes

// Error handling middleware
app.use(errorHandler);

module.exports = app;
