const sinon = require("sinon");
const { expect } = require("chai");
const mongoose = require("mongoose");
const Item = require("../../../models/item");
const { addItem } = require("../../../controllers/itemcont");

describe("POST /items - addItem", function () {

  let req, res;


  

  beforeEach(() => {
    req = { body: {} }; // Mock request object
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }; // Mock response object
  });

  afterEach(() => {
    sinon.restore(); // Restore stubs and spies after each test
  });

  it("should create a new item and return 201 if data is valid", async function () {
    req.body = {
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

    const mockSavedItem = {
        _id: new mongoose.Types.ObjectId(),
      ...req.body,
      rating: 0, // Default value
    };

    const saveStub = sinon.stub(Item.prototype, "save").resolves(mockSavedItem);

    await addItem(req, res);

    expect(saveStub.calledOnce).to.be.true;
    console.log("saveStub.callCount:", saveStub.callCount);

    console.log("Newww item saved to DB:", mockSavedItem); // Log for debugging
    expect(res.status.calledWith(201)).to.be.true;
    
    
    
    
    
    
    
    
    expect(res.json.calledWith(mockSavedItem)).to.be.true;
  });

  it("should return 400 if required fields are missing", async function () {
    req.body = {
      prices: { S: 20, M: 25, L: 30 },
      category: "Clothing",
      description: "Missing name and variants",
    }; // Missing `name` and `variants`

    await addItem(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "Bad Request",
        message: "Invalid data provided",
      })
    ).to.be.true;
  });

  it("should return 400 if `name` is not unique", async function () {
    req.body = {
      name: "DuplicateShirt",
      prices: { S: 20, M: 25, L: 30 },
      variants: ["S", "M", "L"],
      description: "A duplicate shirt",
      targetmarket: "Youth",
      category: "Clothing",
      collection: "Spring",
      image: "image_url.jpg",
    };

    const saveStub = sinon
      .stub(Item.prototype, "save")
      .rejects({ code: 11000 }); // Simulate MongoDB unique constraint violation

    await addItem(req, res);

    expect(saveStub.calledOnce).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "Bad Request",
        message: "Invalid data provided",
      })
    ).to.be.true;
  });

  it("should return 400 if `prices` field is missing", async function () {
    req.body = {
      name: "InvalidShirt",
      variants: ["S", "M", "L"],
      description: "A shirt missing prices",
      targetmarket: "Youth",
      category: "Clothing",
      collection: "Spring",
      image: "image_url.jpg",
    };

    await addItem(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "Bad Request",
        message: "Invalid data provided",
      })
    ).to.be.true;
  });

  it("should handle database errors gracefully", async function () {
    req.body = {
      name: "ErrorShirt",
      prices: { S: 20, M: 25, L: 30 },
      variants: ["S", "M", "L"],
      description: "A shirt causing database error",
      targetmarket: "Youth",
      category: "Clothing",
      collection: "Spring",
      image: "image_url.jpg",
    };

    const saveStub = sinon
      .stub(Item.prototype, "save")
      .rejects(new Error("Database error"));

    await addItem(req, res);

    expect(saveStub.calledOnce).to.be.true;
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "Bad Request",
        message: "Invalid data provided",
      })
    ).to.be.true;
  });
});
