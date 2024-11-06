// routes/authRoutes.js

const express = require('express');
const { authController } = require('../controllers');
const validateRequest = require('../middleware/validateRequest');
const rateLimiter = require('../middleware/rateLimiter');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules for signup
const signupValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validation rules for login
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Route for user signup
router.post(
  '/signup',
  rateLimiter,
  validateRequest(signupValidation),
  authController.signup
);

// Route for user login
router.post(
  '/login',
  rateLimiter,
  validateRequest(loginValidation),
  authController.login
);

// Route for user logout (if using token blacklisting or session management)
router.post('/logout', authController.logout);

module.exports = router;
