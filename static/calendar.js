const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
const fechaInicio = document.querySelector('#fecha_inicio').value;
$(document).ready(function(){
  $("#fecha").datepicker({
    dateFormat: "yyyy-mm-dd" //formato de fecha personalizado
  });
});
const horaInicio = document.querySelector('#hora_inicio').value;
const fechaFin = document.querySelector('#fecha_fin').value;
const horaFin = document.querySelector('#hora_fin').value;
fechaInicio.addEventListener('change', () => {
  fechaFin.min = fechaInicio.value;
});

horaInicio.addEventListener('change', () => {
  const fechaInicio = new Date(document.querySelector('#fecha_inicio').value + 'T' + horaInicio.value + ':00');
  horaFin.min = horaInicio.value;
  horaFin.max = fechaInicio.toISOString().slice(0, -5);
});

fetch(`/linea?fecha_inicio=${fechaInicio}&hora_inicio=${horaInicio}&fecha_fin=${fechaFin}&hora_fin=${horaFin}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // hacer algo con los datos obtenidos
  })
  .catch(error => console.error(error));
  
});