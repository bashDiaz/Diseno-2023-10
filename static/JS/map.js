// Create a map object and set its view to a specific latitude, longitude, and zoom level
const data1=11.02713824366;
const data2=-74.82960349742;
let vector = [];
let mymap = L.map('map').setView([data1, data2], 12);
polyline = L.polyline(vector, {color: 'red'}).addTo(mymap);
polyline1 = L.polyline([], {color: 'green'}).addTo(mymap);
polyline2 = L.polyline([], {color: 'blue'}).addTo(mymap);
// Add a tile layer to the map using OpenStreetMap's tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);
let id;
let app1Positions = [];
let app2Positions = [];
// Define el icono amarillo
let yellowIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
let marker1 = L.marker([data1, data2]).addTo(mymap);
let marker2 = L.marker([data1, data2], {icon: yellowIcon}).addTo(mymap);

// Create a marker

function updateMarkerAndPolyline(rows) {
  if (id==1){
    const latestData = rows[rows.length - 1]; // obtiene la última posición
    const latlng = L.latLng(latestData[0], latestData[1]); // crea un objeto LatLng con la posición
    marker1.setLatLng(latlng); // actualiza la posición del marcador
    app1Positions.push(latlng); // agrega la posición al arreglo de puntos de la app 1
    polyline1.setLatLngs(app1Positions); // actualiza la polilínea con los nuevos puntos
    mymap.setView(latlng, mymap.getZoom()); // ajusta el zoom para que se vea toda la polilínea
  } else if (id == 2) {
    const latestData = rows[rows.length - 1]; // obtiene la última posición
    const latlng = L.latLng(latestData[0], latestData[1]); // crea un objeto LatLng con la posición
    marker2.setLatLng(latlng); // actualiza la posición del marcador
    app2Positions.push(latlng); // agrega la posición al arreglo de puntos de la app 2
    polyline2.setLatLngs(app2Positions); // actualiza la polilínea con los nuevos puntos
    mymap.setView(latlng, mymap.getZoom()); // ajusta el zoom para que se vea toda la polilínea
  }
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

setInterval(()=> {
  fetch('/id')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    id = data.id;
  });
}, 6000);


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
      //updateMarker(data.rows);
});
}, 2000);
const zoomc = document.getElementById("sli");
const actzoom= mymap.getZoom();
const circle = L.circle([data1, data2], {
  color: 'blue',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500 * zoomc.value / 100
}).addTo(mymap);

zoomc.addEventListener('input', () => {
  circle.setRadius(500*actzoom*0.5* zoomc.value / 100);
});


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