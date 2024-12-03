const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const express = require("express");

const { expect } = require('chai');

const Item = require("../../../models/item.js");
const itemRouter = require("../../../routes/itemroutes.js");
const mongoURL = "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority";

describe('DELETE /api/items/items/:id', function () {
    let item;
    let server;

    before(async function () {
        this.timeout(10000); // Set a higher timeout

        // Connect to MongoDB
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('MongoDB connected');
        }

        // Ensure no items exist and create a sample item
        await Item.deleteMany({});
        item = await Item.create({
            name: "Hat",
            variants: ["small", "medium", "large"],
            prices: { small: 10, medium: 15, large: 20 },
            category: "Accessories",
            description: "A stylish hat",
            image: "https://drive.google.com/file/d/17XDJi8Gfp9AwB1k9rK8KwwB-JSdJud5c/view",
            collection: "Winter",
            targetmarket: "Adults",
            rating: 0,
        });

        // Initialize and start the server
        const app = express();
        app.use(express.json());
        app.use('/api/items', itemRouter);
        server = app.listen(3000);
    });

    after(async () => {
        await Item.deleteMany({});
        await mongoose.connection.close();
        if (server) await server.close();
    });

    it('should successfully delete an item and return a 204 status', async () => {
        const response = await request(server)
            .delete(`/api/items/items/${item._id}`)
            .expect(204);

        const deletedItem = await Item.findById(item._id);
       expect(deletedItem).to.be.null;
    });

    it('should return a 404 error if the item is not found', async () => {
        const invalidId = new mongoose.Types.ObjectId(); // Generate an invalid ID
        const response = await request(server)
            .delete(`/api/items/items/${invalidId}`)
            .expect(404);

        expect(response.body.message).to.equal('Item not found');
    });

    it('should return a 500 error if there is a server issue', async () => {
        const mockError = sinon.stub(Item, 'findByIdAndDelete').throws(new Error('Database error'));

        try {
            const response = await request(server)
                .delete(`/api/items/items/${item._id}`)
                .expect(500);

            expect(response.body.message).to.equal('Failed to delete item');
        } finally {
            mockError.restore();
        }
    });
});
