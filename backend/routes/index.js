// routes/index.js

const express = require('express');
const authRoutes = require('./authRoutes');
const busRoutes = require('./busRoutes');
const bookingRoutes = require('./bookingRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Base routes
router.use('/auth', authRoutes);         // Routes for authentication
router.use('/buses', busRoutes);         // Routes for bus information
router.use('/bookings', bookingRoutes);  // Routes for bookings
router.use('/users', userRoutes);        // Routes for user information

// 404 Handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = router;
