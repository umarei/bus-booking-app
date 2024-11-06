// routes/bookingRoutes.js

const express = require('express');
const { bookingController } = require('../controllers');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { body, param } = require('express-validator');

const router = express.Router();

// Validation rules for booking a seat
const bookSeatValidation = [
  body('busId').isMongoId().withMessage('Valid bus ID is required'),
  body('seatNumber')
    .isInt({ min: 1 })
    .withMessage('Seat number must be an integer greater than 0'),
];

// Validation rules for booking ID parameter
const bookingIdValidation = [
  param('bookingId').isMongoId().withMessage('Valid booking ID is required'),
];

// Route to create a new booking
router.post(
  '/',
  authMiddleware,
  validateRequest(bookSeatValidation),
  bookingController.bookSeat
);

// Route to get a specific booking's details
router.get(
  '/:bookingId',
  authMiddleware,
  validateRequest(bookingIdValidation),
  bookingController.getBookingDetails
);

// Route to cancel a booking
router.delete(
  '/:bookingId',
  authMiddleware,
  validateRequest(bookingIdValidation),
  bookingController.cancelBooking
);

// Route to get all bookings for the logged-in user
router.get(
  '/',
  authMiddleware,
  bookingController.getUserBookings
);

module.exports = router;
