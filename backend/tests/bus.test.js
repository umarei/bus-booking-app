// tests/bus.test.js

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Bus = require('../models/Bus');

let busId;

beforeAll(async () => {
  // Connect to test database
  const url = `mongodb://127.0.0.1/bus_booking_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
  await Bus.deleteMany({});
  await mongoose.connection.close();
});

describe('Bus API Tests', () => {
  test('Should retrieve a list of available buses', async () => {
    const response = await request(app).get('/api/buses');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.buses)).toBe(true);
    expect(response.body.buses.length).toBeGreaterThan(0);
  });

  test('Should retrieve bus details by ID', async () => {
    const response = await request(app).get(`/api/buses/${busId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('bus');
    expect(response.body.bus).toHaveProperty('busName', 'Test Bus');
  });

  test('Should return 404 for invalid bus ID', async () => {
    const response = await request(app).get('/api/buses/invalidBusId');
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Valid bus ID is required');
  });
});
