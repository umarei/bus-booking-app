// controllers/userController.js

const { validationResult } = require('express-validator');
const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get User Profile Error:', error);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const updates = req.body;

    // If updating password, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update User Profile Error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Delete User Account Error:', error);
    res.status(500).json({ message: 'Server error deleting account' });
  }
};
