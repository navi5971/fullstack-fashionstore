const request = require("supertest");
const app = require("../server"); // Import your Express app

describe("POST /create-post", () => {
  it("should create a new post successfully", async () => {
    const response = await request(app)
      .post("/api/tailors/create-post")
      .send({
        "name": "Syl Tailored Shirt",
        "email": "example@tilapp.com",
        "category": "Men's Clothing",
        "image": "https://example.com/images/shirt.jpg",
        "description": "A premium tailored shirt for men with a modern fit.",
        "speciality": "Handmade stitching with customizable options",
        "targetmarket": "Men aged 25-40",
        "rating": 4.5
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Post created successfully");
    //expect(response.body.post).toHaveProperty("_id");
  });

  it("should return 500 for invalid data", async () => {
    const response = await request(app).post("/create-post").send({});

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Server error creating post");
  });
});
