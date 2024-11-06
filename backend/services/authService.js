// services/authService.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret, jwtExpiry } = require('../config/authConfig');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    jwtSecret,
    { expiresIn: jwtExpiry }
  );
};

const signup = async (username, email, password) => {
  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  // Create a new user
  const newUser = new User({ username, email, password });
  await newUser.save();

  // Generate JWT token
  const token = generateToken(newUser);
  return { user: newUser.toJSON(), token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user);
  return { user: user.toJSON(), token };
};

module.exports = { signup, login, generateToken };
