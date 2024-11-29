const express = require("express");
const cors = require("cors");
const itemsRoutes = require("./routes/itemroutes");
const hashroute = require('./routes/hashgen');
const notifroute = require('./routes/statuscoderoute');
const testroutes = require('./routes/testroutes');
const mongoose = require("mongoose");
const Item = require('./models/item');
const Test = require("./models/testt");
const connectDB = require("./db");



console.log('Item model imported:', Item);

// Create an Express app
const app = express();

// Middleware for JSON and CORS
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const mongoURL = process.env.NODE_ENV === "test"
    ? "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/testdb?retryWrites=true&w=majority"
    : "mongodb+srv://Navithma:Navithma78@cluster1.gqwja.mongodb.net/fashiondb?retryWrites=true&w=majority";

    connectDB(mongoURL);
console.log("Attempting MongoDB connection...");

mongoose.connect(mongoURL);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected (Event: connected)');
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected (Event: open)');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error (Event: error):', err);
});

// Routes
app.get("/", (req, res) => res.send("Server working"));
app.use('/api/items/', itemsRoutes);
app.use('/h', hashroute);
app.use(notifroute);
app.use(testroutes);

// Test route
app.get('/create-item', async (req, res) => {
  try {
    console.log('test reached');
    const newtest = new Test({
      test: "Casual Hoodie",
      description: "Comfortable hoodie perfect for casual wear.",
    });

    await newtest.save();
    res.json({ message: "Item created successfully!" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the app (without WebSocket and HTTP server logic)
module.exports = app;

// The WebSocket and HTTP server logic
if (require.main === module) {
  const http = require("http"); // HTTP module for WebSocket integration
  const socketIo = require("socket.io"); // socket.io for WebSocket support

  // Create HTTP server and attach it to the app
  const server = http.createServer(app); // Required to support WebSockets

  // Attach socket.io to the HTTP server
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // React frontend URL
      methods: ["GET", "POST"],
    },
    pingInterval: 25000,   // Ping every 25 seconds
    pingTimeout: 20000,    // Timeout after 20 seconds if no ping is received
  });

  // Attach WebSocket instance to all requests
  app.use((req, res, next) => {
    console.log("WebSocket instance attached to req.io");
    req.io = io;
    next();
  });

  // WebSocket event handling
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.emit("server message", "Hello World");

    socket.on("client message", (msg) => {
      console.log("Server received: '" + msg + "'");
    });

    socket.on("request", (msg) => {
      console.log("Received from client:", msg);
      socket.emit("response", "Server received: " + msg);
      socket.broadcast.emit("response", "Message to other clients.");
    });

    // Send a confirmation message to the client when they connect
    socket.emit("confirm connection", "Connected...");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  const port = process.env.PORT || 5000;

  // Start the HTTP server on port 5000
  server.listen(port, '0.0.0.0', () => {
    console.log("Server running on http://localhost:5000");
  });
}