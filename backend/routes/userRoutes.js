// routes/userRoutes.js

const express = require('express');
const { userController } = require('../controllers');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules for updating user profile
const updateUserValidation = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Route to get current user details
router.get('/me', authMiddleware, userController.getUserProfile);

// Route to update current user details
router.put(
  '/me',
  authMiddleware,
  validateRequest(updateUserValidation),
  userController.updateUserProfile
);

// Route to delete user account
router.delete('/me', authMiddleware, userController.deleteUserAccount);

module.exports = router;
