// Import required modules
const { createServer } = require("http"); // Node's built-in HTTP server
const { Server } = require("socket.io"); // Socket.IO server
const { instrument } = require("@socket.io/admin-ui"); // Admin UI tool for monitoring Socket.IO
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

// Create the HTTP server
const httpServer = createServer();

// Initialize Socket.IO server with CORS settings
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"], // Allow access from frontend and admin UI
    credentials: true,
  },
});

// Instrument the server with admin UI dashboard
instrument(io, {
  auth: false, // 🔒 No auth enabled for admin panel (change this to secure access)

  // Uncomment and set correct credentials to enable login protection for admin UI
  /*
  auth: {
    type: "basic",
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
  },
  */
});

// Start listening for incoming connections on port 3000
httpServer.listen(3000);

// Create a custom namespace for users
const userIo = io.of("/user");

// Middleware to authenticate connections to the /user namespace
userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token); // Attach username to socket
    next(); // Proceed with the connection
  } else {
    next(new Error("Please send token")); // Reject connection if no token is sent
  }
});

// Event listener for /user namespace connections
userIo.on("connection", (socket) => {
  console.log("Connected to user namespace with username " + socket.username);
});

// Dummy function to simulate extracting username from a token
const getUsernameFromToken = (token) => {
  console.log(token); // Just logging the token
  return "Boku_wa_token"; // Fake username returned for testing
};

// Event listener for default namespace
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle sending messages to a room or broadcasting to others
  socket.on("send-message", (message, room) => {
    if (room === "") {
      // Broadcast to all except sender
      socket.broadcast.emit("receive-message", message);
    } else {
      // Broadcast to specific room (automatically excludes sender)
      socket.to(room).emit("receive-message", message);
    }
  });

  // Join a specific chat room
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`); // Callback to confirm room joined
  });

  // Handle ping events (for testing volatile events, etc.)
  socket.on("ping", (number) => console.log(number));
});
