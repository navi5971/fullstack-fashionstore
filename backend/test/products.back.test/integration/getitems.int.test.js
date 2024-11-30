// test/products.back.test/integration/getitems.int.test.js
const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");

const server = require("../../../server.js"); 
const Item = require("../../../models/item.js"); 
const itemRouter = require("../../../routes/itemroutes.js")
const sinon = require('sinon');
const { getAllItems } = require('../../../controllers/itemcont.js');


const app = express();
app.use(express.json());
app.use("/", itemRouter);




describe('API Endpoint Tests', function() {
  describe('getAllItems', function() {
    it('Should return all items as a JSON array when items exist', async function() {
      const req = {}; // Mock request object (no specific parameters needed for this endpoint)
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      // Mock items data
      const mockItems = [
        {
          _id: "1",
          name: "Shirt",
          variants: ["Small", "Medium", "Large"],
          prices: { Small: 10, Medium: 15, Large: 20 },
          category: "Clothing",
          description: "A comfortable shirt",
          collection: "Spring",
          targetmarket: "Youth",
          rating: 4.5,
        },
        {
          _id: "2",
          name: "Shoes",
          variants: ["7", "8", "9"],
          prices: { "7": 50, "8": 55, "9": 60 },
          category: "Footwear",
          description: "Stylish running shoes",
          collection: "Summer",
          targetmarket: "Athletes",
          rating: 4.7,
        },
      ];

      // Simulate the database call
      sinon.stub(Item, 'find').returns(Promise.resolve(mockItems));

      await getAllItems(req, res);

      // Check that the response status is 200
      sinon.assert.calledWith(res.status, 200);

      // Check that the response json method was called with the correct items data
      sinon.assert.calledWith(res.json, mockItems);

      // Restore the original Item.find method
      Item.find.restore();
    });

    it('Should return an empty array if no items exist', async function() {
      const req = {}; // Mock request object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      // Simulate a case where no items are found
      sinon.stub(Item, 'find').returns(Promise.resolve([]));

      await getAllItems(req, res);

      // Check that the response status is 200
      sinon.assert.calledWith(res.status, 200);

      // Check that the response json method was called with an empty array
      sinon.assert.calledWith(res.json, []);

      // Restore the original Item.find method
      Item.find.restore();
    });

    it('Should return an error if fetching items fails', async function() {
      const req = {}; // Mock request object
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      // Simulate an error during the database call
      sinon.stub(Item, 'find').returns(Promise.reject(new Error('Database error')));

      await getAllItems(req, res);

      // Check that the response status is 500
      sinon.assert.calledWith(res.status, 500);

      // Check that the response json method was called with the error message
      sinon.assert.calledWith(res.json, { message: 'Database error' });

      // Restore the original Item.find method
      Item.find.restore();
    });
  });
});

