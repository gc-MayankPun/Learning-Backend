const express = require("express");
const http = require("http");
const ngrok = require("@ngrok/ngrok");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// Setting up Socket.IO server
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../client/public/")));

// Setting up Socket.IO connection
io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("index");
});

server.listen(8080, () =>
  console.log("Node.js web server at 8080 is running...")
);

ngrok
  .connect({ addr: 8080, authtoken_from_env: true })
  .then((listener) => console.log(`Ingress established at: ${listener.url()}`));
