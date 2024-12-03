const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const { expect } = require("chai");

const server = require("../../../server.js"); // Adjust this path to your server file
const Item = require("../../../models/item.js"); // Adjust this path to your Item model

// Connect to MongoDB Atlas for testing
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority";

// Increase Mocha's timeout for all tests
before(async function () {
    this.timeout(10000); // Global timeout for 'before' hook
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    }
});

// Clear the test database after each test
afterEach(async function () {
    this.timeout(5000); // Timeout for cleanup operations
    await Item.deleteMany({});
});

// Close the database connection after all tests are done
after(async function () {
    this.timeout(5000); // Timeout for final cleanup
    await mongoose.connection.close();
});

describe("PATCH /api/items/items/:id", function () {
    this.timeout(5000); // Timeout for all tests in this suite
    let itemId;

    // Create a sample item before each test
    beforeEach(async function () {
        const newItem = new Item({
            name: "Shirt",
            prices: { small: 10, medium: 15, large: 20 },
            description: "A cool shirt",
            variants: ["small", "medium", "large"],
            category: "Clothing",
            collection: "Summer",
            targetmarket: "All",
            image: "https://example.com/image.jpg",
        });
        const savedItem = await newItem.save();
        itemId = savedItem._id; // Store the item's ID for later use
    });

    it("should successfully update an item and return a 200 status", async function () {
        const updatedData = {
            name: "Updated Shirt",
            description: "An updated cool shirt",
            prices: { small: 12, medium: 17, large: 22 },
        };

        const response = await request(server)
            .patch(`/api/items/items/${itemId}`)
            .send(updatedData);

        expect(response.status).to.equal(200);
        expect(response.body.updatedItem.name).to.equal("Updated Shirt");
        expect(response.body.updatedItem.description).to.equal("An updated cool shirt");
        expect(response.body.updatedItem.prices.small).to.equal(12);
    });

    it("should return a 404 error if the item is not found", async function () {
        const invalidId = new mongoose.Types.ObjectId();

        const updatedData = { name: "Non-existent Item" };

        const response = await request(server)
            .patch(`/api/items/items/${invalidId}`)
            .send(updatedData);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("Item not found");
    });

    it("should return a 500 error if there is a server issue", async function () {
        // Simulate a server error by passing invalid data to trigger a validation error
        const response = await request(server)
            .patch(`/api/items/items/${itemId}`)
            .send({ name: "" }); // Invalid name (since it's required)

        expect(response.status).to.equal(500);
        expect(response.body.message).to.equal("Server error");
    });
});

