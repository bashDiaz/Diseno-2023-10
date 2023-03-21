// Create a map object and set its view to a specific latitude, longitude, and zoom level
const data1=11.02713824366;
const data2=-74.82960349742;
vector=[[11.02713824366,-74.82960349742]];
let mymap = L.map('map').setView([data1, data2], 12);
polyline = L.polyline(vector, {color: 'red'}).addTo(mymap);
// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap); 

// Create a marker and update dataSocket
var marker = L.marker([data1, data2]).addTo(mymap);
function updateMarker([data1, data2]) {
  marker.setLatLng([data1, data2]);
}

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
}, 1000);

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
