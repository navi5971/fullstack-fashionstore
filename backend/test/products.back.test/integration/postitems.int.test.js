const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../../../server.js"); // Ensure this path is correct to your server file
const Item = require("../../../models/item.js"); // Ensure this path is correct to your Item model
const sinon = require('sinon');
const { expect } = require('chai');

// Replace this with your actual Atlas test database connection string
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority";

// Mocha setup (beforeEach, afterEach)
before(async function () {
    this.timeout(15000);  // Increase timeout for connection to MongoDB
    await Item.deleteMany({});
    // Ensure no previous connection exists
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    }
});

after(async () => {
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
        image: "https://drive.google.com/file/d/17XDJi8Gfp9AwB1k9rK8KwwB-JSdJud5c/view",
        collection: "Winter",
        targetmarket: "Adults",
        rating: 0
      };

    const response = await request(server) // Use the Express app server instance
      .post("/api/items/items") // Replace with your actual endpoint for adding an item
      .send(newItem);

    expect(response.status).to.equal(201);
    expect(response.body.variants).to.deep.equal(['small', 'medium', 'large']);
    expect(response.body.name).to.equal(newItem.name);
    expect(response.body.variants).to.deep.equal(newItem.variants);
    expect(response.body.prices).to.deep.equal(newItem.prices);
    expect(response.body.category).to.equal(newItem.category);
    expect(response.body.description).to.equal(newItem.description);
    expect(response.body.image).to.equal(newItem.image);
    expect(response.body.collection).to.equal(newItem.collection);
    expect(response.body.targetmarket).to.equal(newItem.targetmarket);
    expect(response.body.rating).to.equal(newItem.rating);
  });

  it('should return a 400 error when an internal server error occurs', async () => {
    // Simulating a database error or server issue
    sinon.stub(Item.prototype, 'save').rejects(new Error('Database error'));

    const newItem = {
      name: "Hat",
      variants: ["small", "medium", "large"],
      prices: {
        small: 10,
        medium: 15,
        large: 20
      },
      category: "Accessories",
      description: "A stylish hat",
      image: "https://drive.google.com/file/d/17XDJi8Gfp9AwB1k9rK8KwwB-JSdJud5c/view",
      collection: "Winter",
      targetmarket: "Adults",
      rating: 0
    };

    const response = await request(server)
      .post('/api/items/items') // Adjust the endpoint if needed
      .send(newItem);

    expect(response.status).to.equal(400); // Expect 400 status
    expect(response.body).to.have.property('error', 'Bad Request');
expect(response.body).to.have.property('message').that.includes('Invalid data provided');

    // Restore the stubbed method
    Item.prototype.save.restore();
  });

});

