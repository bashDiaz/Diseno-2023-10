const formulario = document.getElementById('formulario-fecha-hora');

// Agrega un controlador de eventos para el envío del formulario
formulario.addEventListener('submit', (event) => {
  // Previene el envío del formulario por defecto
  event.preventDefault();

  // Obtiene los valores de fecha y hora del formulario
  const fechaInicio = document.getElementById('fecha-inicio').value;
  const horaInicio = document.getElementById('hora-inicio').value;
  const fechaFin = document.getElementById('fecha-fin').value;
  const horaFin = document.getElementById('hora-fin').value;

  // Crea una instancia del objeto XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Configura la solicitud HTTP GET con los parámetros de fecha y hora
  const url = `/linea?fecha_inicio=${fechaInicio}&hora_inicio=${horaInicio}&fecha_fin=${fechaFin}&hora_fin=${horaFin}`;
  xhr.open('GET', url);

  // Agrega un controlador de eventos para la respuesta de la solicitud
  xhr.addEventListener('load', () => {
    // Analiza los datos de respuesta JSON
    const response = JSON.parse(xhr.responseText);
    const rows = response.rows;

    // Hace algo con los valores de "Latitud" y "Longitud"
    console.log(rows);
  });

  // Envía la solicitud HTTP GET
  xhr.send();
});