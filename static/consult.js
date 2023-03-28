function consultar() {
    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_final = document.getElementById("fecha_final").value;
    const hora_inicio = document.getElementById("hora_inicio").value;
    const hora_final = document.getElementById("hora_final").value;
    
    const url = `/consultar?fecha_inicio=${fecha_inicio}&fecha_final=${fecha_final}&hora_inicio=${hora_inicio}&hora_final=${hora_final}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  