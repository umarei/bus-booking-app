// tests/auth.test.js

const request = require('supertest');
const app = require('../app'); // Importing the Express app
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  // Connect to a test database
  const url = `mongodb://127.0.0.1/bus_booking_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Authentication API Tests', () => {
  let token;

  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully!');
    expect(response.body).toHaveProperty('token');
  });

  test('Should not register a user with existing email', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message', 'Email is already registered');
  });

  test('Should login a user and return a token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token; // Save token for later tests
  });

  test('Should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid email or password');
  });

  test('Should access protected route with valid token', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });

  test('Should not access protected route without token', async () => {
    const response = await request(app).get('/api/users/me');
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Access denied. No token provided.');
  });
});
