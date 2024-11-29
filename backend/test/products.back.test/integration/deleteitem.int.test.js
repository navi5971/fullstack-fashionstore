const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const server = require("../../../server.js"); 
const Item = require("../../../models/item.js");
const itemRouter = require("../../../routes/itemroutes.js")
const sinon = require('sinon');
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority";
jest.setTimeout(10000); 

describe('DELETE /api/items/items/:id', () => {
    let item;

    // Setup: Create a sample item before tests
    beforeAll(async () => {
        await Item.deleteMany({});
        // Ensure no previous connection exists
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });}
       

        // Create a test item in the database
        item = await Item.create({
            name: "Hat",
            variants: ["small", "medium", "large"], 
            prices: { 
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
        });
    });

    // Cleanup: Remove the item from the database after tests
    afterAll(async () => {
        await Item.deleteMany({});
        mongoose.connection.close();
    });

    test('should successfully delete an item and return a 204 status', async () => {
        const response = await request(server)
            .delete(`/api/items/items/${item._id}`)
            .expect(204);

        // Verify that the item has been deleted
        const deletedItem = await Item.findById(item._id);
        expect(deletedItem).toBeNull();
    });

    test('should return a 404 error if the item is not found', async () => {
        // Using an invalid ID that doesn't exist in the DB
        const invalidId = new mongoose.Types.ObjectId();
        const response = await request(server)
            .delete(`/api/items/items/${invalidId}`)
            .expect(404);

        expect(response.body.message).toBe('Item not found');
    });

    test('should return a 500 error if there is a server issue', async () => {
        // Mock a server issue by simulating an error in the findByIdAndDelete method
        jest.spyOn(Item, 'findByIdAndDelete').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(server)
            .delete(`/api/items/items/${item._id}`)
            .expect(500);

        expect(response.body.message).toBe('Failed to delete item');
    });
});
