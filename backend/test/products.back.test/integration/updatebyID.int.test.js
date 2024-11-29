// test/products.back.test/integration/getitems.int.test.js
const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const server = require("../../../server.js"); // Adjust this path to your server file
const Item = require("../../../models/item.js"); // Adjust this path to your Item model
const itemRouter = require("../../../routes/itemroutes.js")
const sinon = require('sinon');
const { getAllItems } = require('../../../controllers/itemcont.js');

// Connect to MongoDB Atlas for testing
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority";
beforeAll(async () => {
   
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
      }
});



// Clear the test database after each test
afterEach(async () => {
    await Item.deleteMany({});
});

// Close the database connection after all tests are done
afterAll(async () => {
    await Item.deleteMany({});
    await mongoose.connection.close();
    
   
});

// Test case for successful item update
describe("PATCH /api/items/items/:id", () => {
    let itemId;

    // Create a sample item before the tests
    beforeEach(async () => {
        const newItem = new Item({
            name: "Shirt",
            prices: { small: 10, medium: 15, large: 20 },
            description: "A cool shirt",
            variants: ["small", "medium", "large"],
            category: "Clothing",
            collection: "Summer",
            targetmarket: "All",
            image: "https://example.com/image.jpg"
        });
        const savedItem = await newItem.save();
        itemId = savedItem._id; // Store the item's ID for later use
    });

    test("should successfully update an item and return a 200 status", async () => {
        const updatedData = {
            name: "Updated Shirt",
            description: "An updated cool shirt",
            prices: { small: 12, medium: 17, large: 22 },
        };

        const response = await request(server)
            .patch(`/api/items/items/${itemId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.updatedItem.name).toBe("Updated Shirt");
        expect(response.body.updatedItem.description).toBe("An updated cool shirt");
        expect(response.body.updatedItem.prices.small).toBe(12);
    });

    test("should return a 404 error if the item is not found", async () => {
        const invalidId = new mongoose.Types.ObjectId();

        const updatedData = { name: "Non-existent Item" };

        const response = await request(server)
            .patch(`/api/items/items/${invalidId}`)
            .send(updatedData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Item not found");
    });

    test("should return a 500 error if there is a server issue", async () => {
        // Simulate a server error by passing invalid data to trigger a validation error
        const response = await request(server)
            .patch(`/api/items/items/${itemId}`)
            .send({ name: "" });  // Invalid name (since it's required)

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Server error");
    });
});
