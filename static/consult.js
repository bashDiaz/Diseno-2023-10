function consultar() {
  const fecha_inicio = document.getElementById("fecha_inicio").value;
  const fecha_final = document.getElementById("fecha_final").value;
  const hora_inicio = document.getElementById("hora_inicio").value;
  const hora_final = document.getElementById("hora_final").value;
  const vehicle = document.getElementById("vehicle").value;
  if (fecha_inicio === fecha_final && hora_final < hora_inicio) {
    alert("ERROR: La hora de finalización no puede ser menor a la hora de inicio si las fechas son iguales");
    return;
  }
  
  const url = `/consultar?fecha_inicio=${fecha_inicio}&fecha_final=${fecha_final}&hora_inicio=${hora_inicio}&hora_final=${hora_final}&vehicle=${vehicle}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.rows.length === 0) {
        alert("No se ha encontrado nada");
      }
    })
    .catch(error => {
      console.error(error);
    });
}
