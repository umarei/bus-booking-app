// utils/seatHelper.js

const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

const getAvailableSeats = async (busId) => {
  const bus = await Bus.findById(busId);
  if (!bus) throw new Error('Bus not found');

  const totalSeats = bus.totalSeats;
  const bookedSeats = await Booking.find({ busId, status: 'booked' }, 'seatNumber');
  const bookedSeatNumbers = bookedSeats.map((booking) => booking.seatNumber);

  const availableSeats = [];
  for (let i = 1; i <= totalSeats; i++) {
    if (!bookedSeatNumbers.includes(i)) {
      availableSeats.push(i);
    }
  }

  return availableSeats;
};

const checkSeatAvailability = async (busId, seatNumber) => {
  const booking = await Booking.findOne({ busId, seatNumber, status: 'booked' });
  return !booking;
};

module.exports = { getAvailableSeats, checkSeatAvailability };
