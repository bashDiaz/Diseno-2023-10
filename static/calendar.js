const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
const fechaInicio = document.querySelector('#fecha_inicio').value;
const horaInicio = document.querySelector('#hora_inicio').value;
const fechaFin = document.querySelector('#fecha_fin').value;
const horaFin = document.querySelector('#hora_fin').value;

fetch(`/linea?fecha_inicio=${fechaInicio}&hora_inicio=${horaInicio}&fecha_fin=${fechaFin}&hora_fin=${horaFin}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // hacer algo con los datos obtenidos
  })
  .catch(error => console.error(error));
  
});