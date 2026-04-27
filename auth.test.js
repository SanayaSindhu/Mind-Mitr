


import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../routes/auth.js';
import connectDB from '../config/db.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);



describe('Auth API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return validation error for missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    if (res.statusCode === 500) console.error('Server error:', res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  }, 15000);

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 'testuser@example.com', password: 'password123', role: 'student' });
    if (res.statusCode === 500) console.error('Server error:', res.body);
    expect([200, 400]).toContain(res.statusCode); // 400 if user already exists
  }, 15000);

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'wrongpassword' });
    if (res.statusCode === 500) console.error('Server error:', res.body);
    expect(res.statusCode).toBe(400);
  }, 15000);

  it('should access protected route with valid JWT', async () => {
    // Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' });
    expect(loginRes.statusCode).toBe(200);
    const token = loginRes.body.token;
    expect(token).toBeDefined();

    // Access protected route
    const protectedRes = await request(app)
      .get('/api/auth/protected')
      .set('Authorization', `Bearer ${token}`);
    if (protectedRes.statusCode === 500) console.error('Server error:', protectedRes.body);
    expect(protectedRes.statusCode).toBe(200);
    expect(protectedRes.body.user).toBeDefined();
    expect(protectedRes.body.msg).toBe('You have accessed a protected route!');
  }, 15000);
});
