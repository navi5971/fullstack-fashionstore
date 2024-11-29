const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Item = require("../../models/item"); // Path to your Item model
const itemRouter = require("../../routes/itemroutes"); // Path to your router file
const server = require('../../server');


jest.mock("../../models/item"); // Mock the Item model

describe('Post Routes', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  describe('POST /create-post', () => {
    test('should create a new post and emit an event', async () => {
      const mockPost = { name: 'PostItem' };
      Item.prototype.save = jest.fn().mockResolvedValue(mockPost);

      const res = await request(app).post('/create-post').send(mockPost);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Post created successfully');
      expect(res.body).toHaveProperty('post', mockPost);
    });

    it('should handle server errors', async () => {
      Item.prototype.save = jest.fn().mockRejectedValue(new Error('Server error'));

      const res = await request(app).post('/create-post').send({ name: 'InvalidPost' });

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Server error creating post');
    });
  });
});
