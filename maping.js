// Create a map object and set its view to a specific latitude, longitude, and zoom level
let mymap = L.map('map').setView([77, -77], 50);

// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18, // Set the maximum zoom level
}).addTo(mymap); // Add the tile layer to the map

// Add a marker to the map at a specific latitude and longitude
let marker = L.marker([77, -77]).addTo(mymap);

// Add a polyline to the map
const polyline = L.polyline(polylinePoints, {color: 'red'}).addTo(mymap);

// Add diferent location for the polyline (please select points to track)
const polylinePoints = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];