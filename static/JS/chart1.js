let ctx = document.getElementById('grafico').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Producción estimada de CO2'],
    datasets: [{
      label: 'Huella Total estimada',
      data: [0], // inicializamos los datos con 0
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },{
      label: 'Producción por hora de un Ser humano (KG/CO2)',
      data: [0.044],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
totalhuella=0;
setInterval(() => {
  fetch('/huella')
    .then(response => response.json())
    .then(data => {
      totalhuella+=data.huella;
      myChart.data.datasets[0].data[0] = totalhuella; // actualizamos los datos del primer dataset
      myChart.update(); // actualizamos el gráfico
    })
    .catch(error => {
      console.error(error);
    });
}, 10000); // realizamos un fetch cada 1000 milisegundos (1 segundo)