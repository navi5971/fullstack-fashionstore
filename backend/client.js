const io = require("socket.io-client");

// Connect to the server
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Ensure WebSocket transport
});

socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);

  // Test event
  socket.emit("test event", "Hello, server!");

  socket.on("response", (message) => {
    console.log("Server response:", message);
  });
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
