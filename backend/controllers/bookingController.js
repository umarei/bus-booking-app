// controllers/bookingController.js

const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const User = require('../models/User');

// Create a booking
exports.bookSeat = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { busId, seatNumber } = req.body;
    const bus = await Bus.findById(busId);

    // Validate bus
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Validate seat
    if (!bus.seats.includes(seatNumber)) {
      return res.status(400).json({ message: 'Invalid seat number' });
    }

    // Check if the seat is already booked
    const existingBooking = await Booking.findOne({ busId, seatNumber });
    if (existingBooking) {
      return res.status(409).json({ message: 'Seat already booked' });
    }

    // Create the booking
    const booking = new Booking({
      userId: req.userId,
      busId,
      seatNumber,
      bookingTime: new Date(),
    });
    await booking.save();

    res.status(201).json({ message: 'Seat booked successfully', booking });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
};

// Get details of a specific booking
exports.getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('busId')
      .populate('userId', 'username email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error('Get Booking Details Error:', error);
    res.status(500).json({ message: 'Server error fetching booking details' });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.bookingId,
      userId: req.userId, // Ensure users can only cancel their own bookings
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Cancel Booking Error:', error);
    res.status(500).json({ message: 'Server error during booking cancellation' });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate('busId')
      .sort({ bookingTime: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get User Bookings Error:', error);
    res.status(500).json({ message: 'Server error fetching user bookings' });
  }
};
