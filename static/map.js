// Create a map object and set its view to a specific latitude, longitude, and zoom level
let mymap = L.map('map').setView([40.7128, -74.0060], 12);
// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap); 

// Create a marker and update dataSocket
var marker = L.marker([data1, data2]).addTo(mymap);
function updateMarker(data1, data2) {
  marker.setLatLng([data1, data2]);
}




// const markers = {};
// function handleUdpData(data) {
//   // Add a marker to the map at a specific latitude and longitude
//   const [lat, lng, seq] = data.split(';');
//   let newCoords = L.latLng(lat, lng);
//   L.marker(newCoords).addTo(mymap);
  // Add polylines for markers registered on UDP sender and based on sequences
  // if (!markers[seq]) {
  //   markers[seq] = [];
  // }
  // markers[seq].push(newCoords);
  // const latLngs = markers[seq];
  // if (latLngs.length > 1) {
  //   if (!markers[seq].polyline) {
  //     const polyline = L.polyline(latLngs).addTo(mymap);
  //     markers[seq] = polyline;
  //   } else {
  //     markers[seq].addLatLng(newCoords);
  //     markers[seq].setLatLngs(markers[seq].getLatLngs());
  //   }
  // }
//}