function limpiar() {
    document.getElementById('clear_button').addEventListener('click', limpiar);
    // Obtener los elementos del DOM
    const fechaInicio = document.getElementById('fecha_inicio');
    const fechaFinal = document.getElementById('fecha_final');
    const horaInicio = document.getElementById('hora_inicio');
    const horaFinal = document.getElementById('hora_final');
  
    // Limpiar los valores de los elementos
    fechaInicio.value = '';
    fechaFinal.value = '';
    horaInicio.value = '';
    horaFinal.value = '';
    const url = `/consultar?fecha_inicio=${'2023-02-09'}&fecha_final=${'2023-02-09'}&hora_inicio=${'01:00'}&hora_final=${'01:01'}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(error => {
      console.error(error);
    });
  }

  