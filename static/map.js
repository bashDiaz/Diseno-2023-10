// Create a map object and set its view to a specific latitude, longitude, and zoom level
const data1 = 11.02713824366;
const data2 = -74.82960349742;
vector = [[data1,data2]];
let mymap = L.map('map').setView([data1, data2], 12);
polyline = L.polyline(vector, {color: 'red'}).addTo(mymap);
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
setInterval(updateMarker, 10000);

function updatePolyline(rows) {
  var coordsArray =rows
  if (polyline) {
    polyline.setLatLngs(coordsArray);
  } else {
    polyline = L.polyline(coordsArray, {color: 'red'}).addTo(mymap);
    console.log('fcn')
  }
}

setInterval(() => {
  fetch('/linea')
    .then(response => response.json())
    .then(data => {
      console.log(data.rows);
      updatePolyline(data.rows);
    });
}, 10000);