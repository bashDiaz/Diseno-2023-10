document.addEventListener("DOMContentLoaded", function() {
    // Obtener la referencia al elemento select del vehículo
    var vehicleSelect = document.getElementById("vehicle");

    // Agregar el evento de cambio al elemento select
    vehicleSelect.addEventListener("change", function() {
      var selectedVehicle = vehicleSelect.value; // Obtener el valor seleccionado

      // Realizar la solicitud al servidor con el valor seleccionado
      const url = `/v1?vehiculo=${selectedVehicle}`;
      fetch(url)
        .then(response => {
          // Manejar la respuesta del servidor aquí
        })
        .catch(error => {
          // Manejar errores de la solicitud aquí
        });
    });
  });