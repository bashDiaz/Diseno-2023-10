let ctx = document.getElementById('grafico').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Huella Total estimada'],
    datasets: [{
      label: 'Producción estimada de CO2 Vehiculo 1',
      data: [0], // inicializamos los datos con 0
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },{
      label: 'Producción de 12 personas (KG/CO2)',
      data: [0],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },{
      label: 'Producción estimada de CO2 Vehiculo 2',
      data: [0],
      backgroundColor: 'rgba(46, 204, 113, 0.2)', // Establecer el color verde
      borderColor: 'rgba(46, 204, 113, 1)', // Establecer el color verde
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
totalhuella1=0;
s=0.0001;


setInterval(() => {
  s+=0.0014583;
  myChart.data.datasets[1].data[0] = s; 
  myChart.update();
  fetch('/huella')
    .then(response => response.json())
    .then(data => {
      totalhuella+=data.huella;
      myChart.data.datasets[0].data[0] = totalhuella; 
      
      // actualizamos los datos del primer dataset
      myChart.update(); // actualizamos el gráfico
    })
    .catch(error => {
      console.error(error);
    });
    fetch('/huella1')
    .then(response => response.json())
    .then(data => {
      totalhuella1+=data.huella;
      myChart.data.datasets[2].data[0] = totalhuella1; // actualizamos los datos del primer dataset
      myChart.update(); // actualizamos el gráfico
    })
    .catch(error => {
      console.error(error);
    });
}, 10000); // realizamos un fetch cada 1000 milisegundos (1 segundo)
