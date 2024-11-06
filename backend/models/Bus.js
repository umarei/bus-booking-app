// models/Bus.js

const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: [true, 'Bus name is required'],
    trim: true,
  },
  route: {
    source: {
      type: String,
      required: [true, 'Source is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats are required'],
    min: [1, 'Total seats must be at least 1'],
  },
  availableSeats: {
    type: Number,
    required: [true, 'Available seats are required'],
    min: [0, 'Available seats cannot be negative'],
  },
  departureTime: {
    type: Date,
    required: [true, 'Departure time is required'],
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: 'Departure time must be in the future',
    },
  },
  arrivalTime: {
    type: Date,
    required: [true, 'Arrival time is required'],
    validate: {
      validator: function (value) {
        return value > this.departureTime;
      },
      message: 'Arrival time must be after departure time',
    },
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
    default: 'Non-AC',
  },
  amenities: {
    type: [String],
    default: [],
  },
  fare: {
    type: Number,
    required: [true, 'Fare is required'],
    min: [0, 'Fare cannot be negative'],
  },
  // Additional fields like driver details can be added here
});

module.exports = mongoose.model('Bus', busSchema);
