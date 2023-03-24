// Create a map object and set its view to a specific latitude, longitude, and zoom level
const data1 = 11.02713824366;
const data2 = -74.82960349742;
let vector = [];
let mymap = L.map('map').setView([data1, data2], 12);
polyline = L.polyline(vector, {color: 'red'}).addTo(mymap);
polyline1 = L.polyline([], {color: 'green'}).addTo(mymap);

// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

// Create and update a marker
var marker = L.marker([data1, data2]).addTo(mymap);
function updateMarkerAndPolyline(rows) {
  const latestData = rows[rows.length - 1];
  const latlng = L.latLng(latestData[0], latestData[1]);
  marker.setLatLng(latlng);
  vector.push(latlng);
  polyline1.setLatLngs(vector);
}

// Every 10 seconds, it make a request to API
setInterval(() => {
  fetch('/last')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateMarkerAndPolyline(data.rows);
    });
}, 10000);

// Polyline is updated in real time
function updatePolyline(rows) {
  var coordsArray = rows
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
updateMarker(data.rows);
});
}, 2000);