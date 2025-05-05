const http = require("http");
const server = http.createServer();

const io = require("socket.io")(
  server.listen(3000),
  {
    cors: {
      origin: ["http://localhost:8080", "https://admin.socket.io/"],
    },
  }
);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send-message", (message, room) => {
    if (room === "") {
      // io.emit("receive-message", message); // Sends to all
      socket.broadcast.emit("receive-message", message); // Sends to all except the sender
    } else {
      socket.to(room).emit("receive-message", message); // It already uses broadcast
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
