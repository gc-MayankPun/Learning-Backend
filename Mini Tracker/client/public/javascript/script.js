const socket = io();

// Checks if the browser supports geolocation
// watchPosition accepts three parameters:
// 1. Success callback (receives position)
// 2. Error callback
// 3. Options object
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (err) => console.error("Error:", err.message),
    {
      enableHighAccuracy: true,
      timeout: 5000, // Sends data (coords in this case) after 5s
      maximumAge: 0, // No save data (No cache to be precise)
    }
  );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap",
}).addTo(map);

const markers = {};
// let isFirstUpdate = true; // Enable for one-time update
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  // console.log(data);
  // console.log(`Latitude: ${latitude}`);
  // console.log(`Longitude: ${longitude}`);
  map.setView([latitude, longitude]); // disable one-time update

  // Enable for one-time update
  // if (isFirstUpdate) {
  //   map.setView([latitude, longitude]);
  //   isFirstUpdate = false;
  // }

  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});
