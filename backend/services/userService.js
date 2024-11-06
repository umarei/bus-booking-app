// services/userService.js

const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const getUserById = async (userId) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (userId, userData) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  // Hash password if it's being updated
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  const user = await User.findByIdAndUpdate(userId, userData, { new: true }).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const deleteUser = async (userId) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { getUserById, updateUser, deleteUser };
