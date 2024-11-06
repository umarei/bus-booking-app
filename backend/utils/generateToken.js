// utils/generateToken.js

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiry } = require('../config/authConfig');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: jwtExpiry }
  );
};

module.exports = generateToken;
