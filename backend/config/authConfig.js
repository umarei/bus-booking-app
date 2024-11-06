// authConfig.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Retrieve and validate JWT secret
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Retrieve and validate JWT expiry time
const jwtExpiry = process.env.JWT_EXPIRY || '1h'; // Default to '1h' if not set

// Retrieve and validate salt rounds for password hashing
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
if (isNaN(saltRounds)) {
  throw new Error('SALT_ROUNDS must be a valid number in environment variables');
}

module.exports = {
  jwtSecret,
  jwtExpiry,
  saltRounds,
};
