window.addEventListener('load', () => {
  // Código para inicializar el mapa de Leaflet
});
// Create a map object and set its view to a specific latitude, longitude, and zoom level
let mymap = L.map('map').setView([11, -74], 50);

// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributo>  maxZoom: 18, // Set the maximum zoom level
}).addTo(mymap); // Add the tile layer to the map

// Add a marker to the map at a specific latitude and longitude
function handleUdpData(data) {
  const [lat, lng] = data.split(';');
  let newCoords = L.latLng(lat, lng);
  L.marker(newCoords).addTo(mymap);
  // Add diferent location for the polyline (please select points to track)
  polylineCoords.push(L.latLng(lat, lng));
  // Add a polyline to the map
  L.polyline(polylineCoords, {color: 'red'}).addTo(mymap);
}
window.addEventListener('resize', function() {
    map.invalidateSize();
});
