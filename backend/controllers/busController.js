// controllers/busController.js

const { validationResult } = require('express-validator');
const Bus = require('../models/Bus');
const Booking = require('../models/Booking');

// Get list of available buses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ departureTime: 1 });
    res.status(200).json({ buses });
  } catch (error) {
    console.error('Get Buses Error:', error);
    res.status(500).json({ message: 'Server error fetching buses' });
  }
};

// Get details of a specific bus, including seat availability
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Get booked seats for this bus
    const bookings = await Booking.find({ busId: bus._id }, 'seatNumber');
    const bookedSeats = bookings.map((booking) => booking.seatNumber);

    res.status(200).json({ bus, bookedSeats });
  } catch (error) {
    console.error('Get Bus By ID Error:', error);
    res.status(500).json({ message: 'Server error fetching bus details' });
  }
};

// Add a new bus (Admin functionality)
exports.addBus = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const busData = req.body;
    const bus = new Bus(busData);
    await bus.save();

    res.status(201).json({ message: 'Bus added successfully', bus });
  } catch (error) {
    console.error('Add Bus Error:', error);
    res.status(500).json({ message: 'Server error adding bus' });
  }
};

// Update bus details (Admin functionality)
exports.updateBus = async (req, res) => {
  try {
    const busUpdates = req.body;
    const bus = await Bus.findByIdAndUpdate(req.params.busId, busUpdates, { new: true });

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json({ message: 'Bus updated successfully', bus });
  } catch (error) {
    console.error('Update Bus Error:', error);
    res.status(500).json({ message: 'Server error updating bus' });
  }
};

// Delete a bus (Admin functionality)
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.busId);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Delete Bus Error:', error);
    res.status(500).json({ message: 'Server error deleting bus' });
  }
};
