const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
});

afterAll(async () => {
  // Close the database connection after tests
  await mongoose.connection.close();
});

// Test Product APIs
describe('Product APIs', () => {
  test('GET /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/products', async () => {
    const product = {
        name: 'Test Product',
        description: 'A test product',
        price: 100,
        stock: 10,
        imageUrl: 'http://example.com/image.jpg',
        category: mongoose.Types.ObjectId(),  // Mock ObjectId for category
        seller: mongoose.Types.ObjectId()     // Mock ObjectId for seller
      };
    const res = await request(app).post('/api/products').send(product);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(product.name);
  });

  // Add more tests for GET by id, PUT, DELETE
});

// Test Category APIs
describe('Category APIs', () => {
  test('GET /api/categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add tests for POST, PUT, DELETE
});

// Test Brand APIs
describe('Brand APIs', () => {
  test('GET /api/brands', async () => {
    const res = await request(app).get('/api/brands');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add tests for POST, PUT, DELETE
});

// Test Seller APIs
describe('Seller APIs', () => {
  test('GET /api/sellers', async () => {
    const res = await request(app).get('/api/sellers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add tests for POST, PUT, DELETE
});

// Test Review APIs
describe('Review APIs', () => {
  test('GET /api/reviews', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add tests for POST, PUT, DELETE
});

// Test Variant APIs
describe('Variant APIs', () => {
  test('GET /api/variants', async () => {
    const res = await request(app).get('/api/variants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add tests for POST, PUT, DELETE
});