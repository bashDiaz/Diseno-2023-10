
        // Obtener la referencia al elemento de la tabla para la hora
        const horaElement = document.getElementById("data4");
      
        // Función para obtener la hora actual en formato HH:MM:SS
        function obtenerHoraActual() {
          const fechaActual = new Date();
          const horas = fechaActual.getHours().toString().padStart(2, "0");
          const minutos = fechaActual.getMinutes().toString().padStart(2, "0");
          const segundos = fechaActual.getSeconds().toString().padStart(2, "0");
          return `${horas}:${minutos}:${segundos}`;
        }
      
        // Actualizar la hora inicialmente
        horaElement.textContent = obtenerHoraActual();
    