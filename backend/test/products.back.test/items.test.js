

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Item = require("../../models/item"); // Path to your Item model
const itemRouter = require("../../routes/itemroutes"); // Path to your router file
const server = require('../../server');

afterAll(async () => {
  await mongoose.connection.close();
  server.close(); // Close the server after tests
});
jest.mock("../../models/item"); // Mock the Item model

const app = express();
app.use(express.json());
app.use("/", itemRouter);

describe("GET /getallitems", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch all items successfully", async () => {
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

    Item.find.mockResolvedValue(mockItems); // Mock the response from Item.find

    const response = await request(app).get("/getallitems");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
    expect(Item.find).toHaveBeenCalledTimes(1);
    console.log("Items fetched from DB:", response.body);
  });

  test("should return 400 if an error occurs while fetching items", async () => {
    const mockError = new Error("Database fetch error");
    Item.find.mockRejectedValue(mockError); // Mock an error during Item.find

    const response = await request(app).get("/getallitems");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Database fetch error");
    expect(Item.find).toHaveBeenCalledTimes(1);
  });
});



