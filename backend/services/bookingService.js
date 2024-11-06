// services/bookingService.js

const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const User = require('../models/User');
const mongoose = require('mongoose');

const createBooking = async (userId, busId, seatNumber) => {
  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(busId)) {
    throw new Error('Invalid user ID or bus ID');
  }

  // Fetch bus and validate
  const bus = await Bus.findById(busId);
  if (!bus) {
    throw new Error('Bus not found');
  }

  // Check if seat number is valid
  if (seatNumber < 1 || seatNumber > bus.totalSeats) {
    throw new Error('Invalid seat number');
  }

  // Check if seat is already booked
  const existingBooking = await Booking.findOne({ busId, seatNumber });
  if (existingBooking) {
    throw new Error('Seat already booked');
  }

  // Create booking
  const booking = new Booking({ userId, busId, seatNumber });
  await booking.save();

  // Update available seats
  bus.availableSeats -= 1;
  await bus.save();

  return booking;
};

const getBookingById = async (bookingId) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error('Invalid booking ID');
  }

  const booking = await Booking.findById(bookingId)
    .populate('userId', 'username email')
    .populate('busId');
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

const cancelBooking = async (userId, bookingId) => {
  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error('Invalid user ID or booking ID');
  }

  // Find booking
  const booking = await Booking.findOne({ _id: bookingId, userId });
  if (!booking) {
    throw new Error('Booking not found or unauthorized');
  }

  // Update bus available seats
  const bus = await Bus.findById(booking.busId);
  bus.availableSeats += 1;
  await bus.save();

  // Cancel booking
  booking.status = 'cancelled';
  await booking.save();

  return booking;
};

const getUserBookings = async (userId) => {
  // Validate user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  const bookings = await Booking.find({ userId })
    .populate('busId')
    .sort({ bookingDate: -1 });

  return bookings;
};

module.exports = { createBooking, getBookingById, cancelBooking, getUserBookings };
