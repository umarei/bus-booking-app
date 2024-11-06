// tests/user.test.js

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

let token;
let userId;

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
  userId = userResponse.body.user._id;
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('User API Tests', () => {
  test('Should retrieve user profile information', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  test('Should update user profile information', async () => {
    const response = await request(app)
      .put('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updateduser' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    expect(response.body.user).toHaveProperty('username', 'updateduser');
  });

  test('Should delete user account', async () => {
    const response = await request(app)
      .delete('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User account deleted successfully');
  });
});
