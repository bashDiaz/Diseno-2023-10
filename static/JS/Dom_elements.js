// Obtener los elementos del DOM
const fechaInicio = document.getElementById('fecha_inicio');
const fechaFinal = document.getElementById('fecha_final');
const horaInicio=document.getElementById('hora_inicio');
const horaFinal=document.getElementById('hora_final');
// Agregar un evento onChange al input de la fecha de inicio
fechaInicio.addEventListener('change', function() {
// Actualizar la propiedad min del input de la fecha final
fechaFinal.min = fechaInicio.value;
});