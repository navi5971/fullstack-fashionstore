const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js"); // Ensure this path is correct to your server file
const Item = require("../../../models/item.js"); // Ensure this path is correct to your Item model
const itemRouter = require("../../../routes/itemroutes.js"); // Ensure this path is correct
const sinon = require('sinon');
const { addItem } = require('../../../controllers/itemcont.js');

// Replace this with your actual Atlas test database connection string
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority";


beforeAll(async () => {
    await Item.deleteMany({});
  // Ensure no previous connection exists
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
  }
});

afterAll(async () => {
  await mongoose.disconnect();  // Disconnect from the database after tests
});

describe("API Endpoint Tests", () => {
 

  it("Should successfully add a new item and return it with a 201 status", async () => {
    const newItem = {
        name: "Hat",
        variants: ["small", "medium", "large"], // Matches the format from the database
        prices: { // Converted to the object format as per your database
          small: 10,
          medium: 15,
          large: 20
        },
        category: "Accessories",
        description: "A stylish hat",
        image:"https://drive.google.com/file/d/17XDJi8Gfp9AwB1k9rK8KwwB-JSdJud5c/view",
        collection: "Winter",
        targetmarket: "Adults",
        rating: 0
      };
      
    const response = await request(server) // Use the Express app server instance
      .post("/api/items/items") // Replace with your actual endpoint for adding an item
      .send(newItem);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
        name: "Hat",
        variants: ["small", "medium", "large"], // Matches the format from the database
        prices: { // Converted to the object format as per your database
          small: 10,
          medium: 15,
          large: 20
        },
        category: "Accessories",
        description: "A stylish hat",
        image:"https://drive.google.com/file/d/17XDJi8Gfp9AwB1k9rK8KwwB-JSdJud5c/view",
        collection: "Winter",
        targetmarket: "Adults",
        rating: 0
       // MongoDB IDs are strings
    });
  });
});



describe('API Endpoint Tests', () => {
    it('should return a 400 error when an internal server error occurs', async () => {
      // Simulating a database error or server issue
      Item.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));
  
      const newItem = {
        name: 'Hat',
        variants: ['small', 'medium', 'large'],
        prices: {
          small: 10,
          medium: 15,
          large: 20
        },
        category: 'Accessories',
        description: 'A stylish hat',
        collection: 'Winter',
        targetmarket: 'Adults',
        rating: 0,
        image: 'https://example.com/hat-image.jpg'
      };
  
      const response = await request(server)
        .post('/api/items/items') // Adjust the endpoint if needed
        .send(newItem);
  
      expect(response.status).toBe(400); // Expect 500 status
      expect(response.body).toHaveProperty('error', 'Bad Request'); // Check error message
      expect(response.body).toHaveProperty('message'); // Ensure error message is provided
    });
  });