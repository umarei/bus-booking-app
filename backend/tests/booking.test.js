// tests/booking.test.js

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Bus = require('../models/Bus');
const Booking = require('../models/Booking');

let token;
let busId;
let bookingId;

beforeAll(async () => {
  // Connect to test database
  const url = `mongodb://127.0.0.1/bus_booking_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a test user
  const userResponse = await request(app)
    .post('/api/auth/signup')
    .send({ username: 'testuser', email: 'testuser@example.com', password: 'password123' });
  token = userResponse.body.token;

  // Create a test bus
  const bus = new Bus({
    busName: 'Test Bus',
    route: { source: 'City A', destination: 'City B' },
    totalSeats: 40,
    availableSeats: 40,
    departureTime: new Date(Date.now() + 3600000), // 1 hour from now
    arrivalTime: new Date(Date.now() + 7200000), // 2 hours from now
    fare: 100,
  });
  await bus.save();
  busId = bus._id;
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await Bus.deleteMany({});
  await Booking.deleteMany({});
  await mongoose.connection.close();
});

describe('Booking API Tests', () => {
  test('Should retrieve available buses', async () => {
    const response = await request(app).get('/api/buses');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.buses)).toBe(true);
    expect(response.body.buses.length).toBeGreaterThan(0);
  });

  test('Should book a seat for a user', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ busId: busId.toString(), seatNumber: 5 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Seat booked successfully');
    expect(response.body).toHaveProperty('booking');
    bookingId = response.body.booking._id;
  });

  test('Should not book an already booked seat', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ busId: busId.toString(), seatNumber: 5 });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message', 'Seat already booked');
  });

  test('Should retrieve user bookings', async () => {
    const response = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.bookings)).toBe(true);
    expect(response.body.bookings.length).toBeGreaterThan(0);
  });

  test('Should cancel a booking', async () => {
    const response = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Booking canceled successfully');
  });
});
