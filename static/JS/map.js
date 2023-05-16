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
  if (id == 1) {
    const latestData = rows[rows.length - 1];
    const latlng = L.latLng(latestData[0], latestData[1]);

    if (app1Positions.length > 0) {
      const lastPosition = app1Positions[app1Positions.length - 1];
      const distance = latlng.distanceTo(lastPosition);

      // Verificar si la distancia es mayor a 800 metros (ajusta este valor según tus necesidades)
      if (distance < 800) {
        marker1.setLatLng(latlng);
        app1Positions.push(latlng);
        polyline1.setLatLngs(app1Positions);
        
      }
    } else {
      // No hay posiciones registradas, agregar la posición inicial
      marker1.setLatLng(latlng);
      app1Positions.push(latlng);
      polyline1.setLatLngs(app1Positions);
    }
  } else if (id == 2) {
    const latestData = rows[rows.length - 1];
    const latlng = L.latLng(latestData[0], latestData[1]);

    if (app2Positions.length > 0) {
      const lastPosition = app2Positions[app2Positions.length - 1];
      const distance = latlng.distanceTo(lastPosition);

      // Verificar si la distancia es mayor a 800 metros (ajusta este valor según tus necesidades)
      if (distance < 800) {
        marker2.setLatLng(latlng);
        app2Positions.push(latlng);
        polyline2.setLatLngs(app2Positions);
        
      }
    } else {
      // No hay posiciones registradas, agregar la posición inicial
      marker2.setLatLng(latlng);
      app2Positions.push(latlng);
      polyline2.setLatLngs(app2Positions);
      
    }
  }
}


  
  
  
setInterval(() => {
  fetch('/ultimoValor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.ultimoValor);
      if (data.ultimoValor == '1') {
        mymap.removeLayer(marker2); // Elimina el marcador 2 si existe
        mymap.removeLayer(polyline2); // Elimina la polilínea 2 si existe
        mymap.addLayer(marker1); // Agrega el marcador 1
        mymap.addLayer(polyline1); // Agrega la polilínea 1
      }
      else if (data.ultimoValor == '2') {
        mymap.removeLayer(marker1); // Elimina el marcador 1 si existe
        mymap.removeLayer(polyline1); // Elimina la polilínea 1 si existe
        mymap.addLayer(marker2); // Agrega el marcador 2
        mymap.addLayer(polyline2); // Agrega la polilínea 2
      }
      else {
        mymap.addLayer(marker1); // Agrega el marcador 1
        mymap.addLayer(polyline1); // Agrega la polilínea 1
        mymap.addLayer(marker2); // Agrega el marcador 2
        mymap.addLayer(polyline2); // Agrega la polilínea 2
      } 
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
}, 500);





// Hace una petición a la API cada 10 segundos
setInterval(() => {
  fetch('/id')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    id = data.id;
  });
  fetch('/last')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateMarkerAndPolyline(data.rows);
    });
}, 8000);



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



