// services/busService.js

const Bus = require('../models/Bus');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const getAllBuses = async (filters = {}) => {
  // Apply filters if any (e.g., source, destination, date)
  const buses = await Bus.find(filters).sort({ departureTime: 1 });
  return buses;
};

const getBusById = async (busId) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(busId)) {
    throw new Error('Invalid bus ID');
  }

  const bus = await Bus.findById(busId);
  if (!bus) {
    throw new Error('Bus not found');
  }

  // Get booked seats for the bus
  const bookings = await Booking.find({ busId }, 'seatNumber');
  const bookedSeats = bookings.map((booking) => booking.seatNumber);

  return { bus, bookedSeats };
};

const addBus = async (busData) => {
  const bus = new Bus(busData);
  await bus.save();
  return bus;
};

const updateBus = async (busId, busData) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(busId)) {
    throw new Error('Invalid bus ID');
  }

  const bus = await Bus.findByIdAndUpdate(busId, busData, { new: true });
  if (!bus) {
    throw new Error('Bus not found');
  }
  return bus;
};

const deleteBus = async (busId) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(busId)) {
    throw new Error('Invalid bus ID');
  }

  const bus = await Bus.findByIdAndDelete(busId);
  if (!bus) {
    throw new Error('Bus not found');
  }
  return bus;
};

module.exports = { getAllBuses, getBusById, addBus, updateBus, deleteBus };
