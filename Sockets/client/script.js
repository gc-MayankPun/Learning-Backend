// Import the Socket.IO client
import { io } from "socket.io-client";

// Select necessary DOM elements
const form = document.querySelector("form");
const messageBox = document.querySelector(".message-box");
const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const joinButton = document.querySelector("#join-button");

// Connect to the default namespace ("/")
const socket = io("http://localhost:3000");

// Connect to a custom namespace "/user" with authentication via token
const userSocket = io("http://localhost:3000/user", {
  auth: { token: "Token_That_Contains_Username" }, // Sent during handshake
});

// On successful connection to default namespace
socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
});

// If there's an error while connecting to the /user namespace, display it
userSocket.on("connect_error", (err) => displayMessage(err));

// Receive and display messages broadcasted from server
socket.on("receive-message", (message) => displayMessage(message));

// Handle form submission to send message
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from refreshing page
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return; // Don't send empty messages
  displayMessage(message); // Show own message instantly
  socket.emit("send-message", message, room); // Send message to server (with optional room)

  messageInput.value = ""; // Clear input box
});

// Handle joining a room
joinButton.addEventListener("click", (event) => {
  const room = roomInput.value;

  if (room === "") return; // Do nothing if no room specified
  socket.emit("join-room", room, (message) => displayMessage(message)); // Join room & receive callback
  // alert(`Room: ${room}`); // (Optional) for debugging
});

// Utility function to display messages in the message box
const displayMessage = (message) => {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = message;
  messageBox.appendChild(div);
};

// Track ping count
let count = 0;

// Send volatile "ping" event every second
// Volatile means it may be dropped if the connection is unstable
setInterval(() => {
  socket.volatile.emit("ping", ++count);
  // socket.emit("ping", ++count); // Use this if you want to guarantee delivery
}, 1000);

// Allow connect/disconnect using keyboard keys
document.addEventListener("keydown", (event) => {
  if (event.target.matches("input")) return; // Ignore if typing in input

  if (event.key === "c") socket.connect(); // Press 'c' to connect
  if (event.key === "d") socket.disconnect(); // Press 'd' to disconnect
});
