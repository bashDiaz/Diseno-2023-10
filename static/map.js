// Create a map object and set its view to a specific latitude, longitude, and zoom level
const data1=11.02713824366;
const data2=-74.82960349742;
let vector = [];
let mymap = L.map('map').setView([data1, data2], 12);
polyline = L.polyline(vector, {color: 'red'}).addTo(mymap);
polyline1 = L.polyline([], {color: 'green'}).addTo(mymap);
// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

// Create a marker
var marker = L.marker([data1, data2]).addTo(mymap);

function updateMarkerAndPolyline(rows) {
  const latestData = rows[rows.length - 1]; // obtiene la última posición
  const latlng = L.latLng(latestData[0], latestData[1]); // crea un objeto LatLng con la posición
  marker.setLatLng(latlng); // actualiza la posición del marcador
  vector.push(latlng); // agrega la posición al arreglo de puntos
  polyline1.setLatLngs(vector); // actualiza la polilínea con los nuevos puntos
}

// Hace una petición a la API cada 10 segundos
setInterval(() => {
  fetch('/last')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateMarkerAndPolyline(data.rows);
    });
}, 10000);


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
updateMarker(data.rows);
});
}, 2000);

let circle = L.circle([data1, data2], {
  color: 'blue',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(mymap);

// Agrega un evento de escucha de clic en el mapa
mymap.on('click', function(e) {
  // Actualiza la posición del círculo a la ubicación del cursor
  circle.setLatLng(e.latlng);
  
  // Obtiene la nueva posición del círculo
  const newLatLng = circle.getLatLng();
  const latitud1Span = document.getElementById('latitud1');
  const longitud1Span = document.getElementById('longitud1');
  // Crea el objeto data con los nuevos valores de latitud y longitud
  const data = {
    lat: newLatLng.lat,
    lng: newLatLng.lng
  };
  latitud1Span.textContent = data.lat;
  longitud1Span.textContent = data.lng;
  const resultElement = document.getElementById('result-list');
fetch('/p4', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  console.log('Respuesta del servidor:', data);
  // Actualiza el contenido de la lista con los resultados
  const resultElement = document.getElementById('result-list');
  const resultItems = data.map(result => `<li>${JSON.stringify(result)}</li>`);
  resultElement.innerHTML = resultItems.join('');
})
.catch(error => {
  console.error('Error al realizar la solicitud POST:', error);
});
  console.log('Nueva posición del círculo:', newLatLng.lat, newLatLng.lng);
});
