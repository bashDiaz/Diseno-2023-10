function resetValues() {
  // Restablece los valores a sus estados iniciales
  polyline.setLatLngs([]);
  polyline1.setLatLngs([]);
  vector = [];
}

// Realiza una solicitud al servidor para restablecer los valores al cargar la página
fetch('/reset-values')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Valores restablecidos correctamente');
    } else {
      console.error('Error al restablecer los valores');
    }
  })
  .catch(error => {
    console.error('Error en la solicitud al restablecer los valores:', error);
  });


window.addEventListener('load', resetValues);
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
}, 1000);
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