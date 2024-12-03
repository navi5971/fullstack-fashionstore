
import sinon from 'sinon';
import mongoose from 'mongoose';
import server from '../../server.js'; // Ensure .js extension is included
import Item from '../../models/item.js'; // Ensure .js extension is included


// Your test code

// Your test code goes here


describe("GET /getallitems", function () {
  let findStub;

  beforeEach(function () {
    findStub = sinon.stub(Item, "find");
  });

  afterEach(function () {
    findStub.restore();
  });

  it("should return all items successfully", function () {
    const mockItems = [
      {
        _id: mongoose.Types.ObjectId(),
        name: "Item 1",
        variants: ["Variant1"],
        prices: { USD: 100 },
        category: "Category 1",
        description: "Description 1",
        collection: "Collection 1",
        targetmarket: "Market 1",
        rating: 4.5,
      },
      {
        _id: mongoose.Types.ObjectId(),
        name: "Item 2",
        variants: ["Variant2"],
        prices: { USD: 150 },
        category: "Category 2",
        description: "Description 2",
        collection: "Collection 2",
        targetmarket: "Market 2",
        rating: 4.0,
      },
    ];
    findStub.resolves(mockItems);

    return chai.request(server)
      .get("/getallitems")
      .then(function (res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
        expect(res.body[0].name).to.equal("Item 1");
        expect(res.body[1].name).to.equal("Item 2");
      });
  });

  it("should return a 400 error if there is an issue with fetching items", function () {
    findStub.rejects(new Error("Database error"));

    return chai.request(server)
      .get("/getallitems")
      .then(function (res) {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Database error");
      });
  });
});