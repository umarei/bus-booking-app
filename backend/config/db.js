// db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Database connection function
const connectDB = async () => {
  try {
    const dbURI = process.env.DB_URI;

    if (!dbURI) {
      throw new Error('DB_URI is not defined in environment variables');
    }

    // Use Mongoose to connect to MongoDB
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

// Event listeners for connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected from DB');
});

module.exports = connectDB;
