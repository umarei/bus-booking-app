// models/Session.js

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  sessionToken: {
    type: String,
    required: [true, 'Session token is required'],
    unique: true,
  },
  ipAddress: {
    type: String,
    default: '',
  },
  userAgent: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Session expires after 24 hours (in seconds)
  },
});

module.exports = mongoose.model('Session', sessionSchema);
