// services/emailService.js

const nodemailer = require('nodemailer');
const config = require('../config/emailConfig');

const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: config.emailSecure, // true for 465, false for other ports
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
});

const sendBookingConfirmation = async (email, bookingDetails) => {
  const mailOptions = {
    from: `"Bus Booking App" <${config.emailUser}>`,
    to: email,
    subject: 'Booking Confirmation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking! Here are the details:</p>
      <ul>
        <li><strong>Bus Name:</strong> ${bookingDetails.busName}</li>
        <li><strong>Seat Number:</strong> ${bookingDetails.seatNumber}</li>
        <li><strong>Departure Time:</strong> ${bookingDetails.departureTime}</li>
        <!-- Add more details as needed -->
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send booking confirmation email');
  }
};

module.exports = { sendBookingConfirmation };
