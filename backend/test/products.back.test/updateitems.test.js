const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Item = require("../../models/item"); // Path to your Item model
const itemRouter = require("../../routes/itemroutes"); // Path to your router file
const server = require('../../server'); // Path to your main server file

jest.mock("../../models/item"); // Mock the Item model

describe("PATCH /updateitem/:id", () => {
  let app;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use("/updateitem", itemRouter); // Assuming you have the itemRouter set up
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server = app.listen(3000); // Start the server if required
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close the DB connection
    server.close(); // Close the server
  });

  test("should update an item successfully", async () => {
    const mockItem = {
      name: "UpdatedItem",
      variants: ["variant1", "variant2"],
      prices: { price1: 10, price2: 15 },
      category: "Category1",
      description: "Updated description",
      collection: "New Collection",
      targetmarket: "Target Market",
      rating: 4,
    };

    const updatedItem = {
      _id: "60d7b7f05b4d440f68b61c59",
      ...mockItem,
    };

    // Mock the findByIdAndUpdate method
    Item.findByIdAndUpdate.mockResolvedValue(updatedItem);

    const res = await request(app).patch("/updateitem/60d7b7f05b4d440f68b61c59").send(mockItem);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("Success");
    expect(res.body.data.updatedItem).toHaveProperty("name", "UpdatedItem");
    expect(res.body.data.updatedItem).toHaveProperty("prices", { price1: 10, price2: 15 });
    expect(res.body.data.updatedItem).toHaveProperty("category", "Category1");
    expect(res.body.data.updatedItem).toHaveProperty("description", "Updated description");
    expect(Item.findByIdAndUpdate).toHaveBeenCalledTimes(1); // Ensure it was called once
  });

  test("should return 404 if item not found", async () => {
    const mockItem = {
      name: "UpdatedItem",
      variants: ["variant1", "variant2"],
      prices: { price1: 10, price2: 15 },
      category: "Category1",
      description: "Updated description",
      collection: "New Collection",
      targetmarket: "Target Market",
      rating: 4,
    };

    // Mock that findByIdAndUpdate returns null (item not found)
    Item.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app).patch("/updateitem/60d7b7f05b4d440f68b61c59").send(mockItem);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe("Fail");
    expect(res.body.message).toBe("Item not found");
  });

  test("should return 400 if the ID format is invalid", async () => {
    const mockItem = {
      name: "UpdatedItem",
      variants: ["variant1", "variant2"],
      prices: { price1: 10, price2: 15 },
      category: "Category1",
      description: "Updated description",
      collection: "New Collection",
      targetmarket: "Target Market",
      rating: 4,
    };

    // Mock the response for invalid ID format (if you check it in your controller)
    const res = await request(app).patch("/updateitem/invalidID").send(mockItem);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("Fail");
    expect(res.body.message).toBe("Invalid Item ID format");
  });

  test("should return 400 if the name is not unique", async () => {
    const mockItem = {
      name: "UpdatedItem", // Trying to update with an already existing name
      variants: ["variant1", "variant2"],
      prices: { price1: 10, price2: 15 },
      category: "Category1",
      description: "Updated description",
      collection: "New Collection",
      targetmarket: "Target Market",
      rating: 4,
    };

    // Mock that findByIdAndUpdate would fail due to a unique constraint violation
    Item.findByIdAndUpdate.mockRejectedValue({
      code: 11000, // MongoDB unique constraint violation error code
      message: "E11000 duplicate key error collection: test.items index: name_1 dup key: { : \"UpdatedItem\" }",
    });

    const res = await request(app).patch("/updateitem/60d7b7f05b4d440f68b61c59").send(mockItem);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("Fail");
    expect(res.body.message).toBe("Duplicate value for name, item already exists");
  });

  test("should handle server errors", async () => {
    const mockItem = {
      name: "UpdatedItem",
      variants: ["variant1", "variant2"],
      prices: { price1: 10, price2: 15 },
      category: "Category1",
      description: "Updated description",
      collection: "New Collection",
      targetmarket: "Target Market",
      rating: 4,
    };

    // Mock that findByIdAndUpdate throws an error
    Item.findByIdAndUpdate.mockRejectedValue(new Error("Database error"));

    const res = await request(app).patch("/updateitem/60d7b7f05b4d440f68b61c59").send(mockItem);

    expect(res.status).toBe(500);
    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("Server error occurred");
    expect(res.body.details).toBe("Database error");
  });
});
