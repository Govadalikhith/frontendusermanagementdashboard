import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';
import { db } from '../src/services/dataStore.js';

describe('User API Endpoints', () => {
  // Wait for database initialization
  beforeAll(async () => {
    // Wait for the dataStore to finish seeding
    let attempts = 0;
    while (!db.isInitialized && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      attempts++;
    }
  });

  describe('GET /health', () => {
    it('should return health status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.database).toBe('ready');
    });
  });

  describe('GET /api/users', () => {
    it('should fetch paginated users list with metadata', async () => {
      const res = await request(app).get('/api/users?page=1&limit=5');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('users');
      expect(res.body).toHaveProperty('totalCount');
      expect(Array.isArray(res.body.users)).toBe(true);
      expect(res.body.users.length).toBeLessThanOrEqual(5);
    });

    it('should filter users by search query', async () => {
      // Find a user name that is likely in the seeded list (e.g. Graham or Howell)
      const res = await request(app).get('/api/users?search=Graham');
      expect(res.status).toBe(200);
      res.body.users.forEach(user => {
        const matchesName = user.firstName.includes('Graham') || user.lastName.includes('Graham') || user.email.includes('Graham');
        expect(matchesName).toBe(true);
      });
    });
  });

  describe('POST /api/users', () => {
    it('should reject requests with missing or invalid fields', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          firstName: '',
          lastName: 'Smith',
          email: 'invalid-email',
          department: ''
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toHaveProperty('firstName');
      expect(res.body.errors).toHaveProperty('email');
      expect(res.body.errors).toHaveProperty('department');
    });

    it('should successfully create a new user and assign a unique ID', async () => {
      const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'Engineering'
      };

      const res = await request(app)
        .post('/api/users')
        .send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.firstName).toBe('John');
      expect(res.body.lastName).toBe('Doe');
      expect(res.body.email).toBe('john.doe@example.com');
      expect(res.body.department).toBe('Engineering');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update an existing user fields', async () => {
      // We will create a user, then update it
      const createRes = await request(app)
        .post('/api/users')
        .send({
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com',
          department: 'Marketing'
        });
      
      const createdId = createRes.body.id;

      const updateRes = await request(app)
        .put(`/api/users/${createdId}`)
        .send({
          firstName: 'Alicia',
          department: 'Design'
        });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.firstName).toBe('Alicia');
      expect(updateRes.body.lastName).toBe('Smith'); // Unchanged
      expect(updateRes.body.department).toBe('Design'); // Updated
    });

    it('should return 404 if updating non-existing user', async () => {
      const res = await request(app)
        .put('/api/users/99999')
        .send({ firstName: 'Nobody' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete an existing user and remove it from store', async () => {
      const createRes = await request(app)
        .post('/api/users')
        .send({
          firstName: 'Bob',
          lastName: 'Jones',
          email: 'bob@example.com',
          department: 'Sales'
        });
      
      const createdId = createRes.body.id;

      const deleteRes = await request(app).delete(`/api/users/${createdId}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.id).toBe(createdId);

      // Verify that user is deleted
      const checkRes = await request(app).get(`/api/users/${createdId}`);
      expect(checkRes.status).toBe(404);
    });
  });
});
