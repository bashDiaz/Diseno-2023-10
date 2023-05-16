let totalhuella = 0;
let totalhuella1 = 0;
let i = 0;
let j = 0;
function updateData() {
  const data1Span = document.getElementById('data1');
  const data2Span = document.getElementById('data2');
  const data3Span = document.getElementById('data3');
  const data4Span = document.getElementById('data4');
  const data5Span = document.getElementById('data5');
  const data6Span = document.getElementById('data6');

  fetch('/data')
    .then(response => response.json())
    .then(data => {
      data1Span.textContent = data[0];
      data2Span.textContent = data[1];
      data3Span.textContent = data[2];
      data4Span.textContent = data[3];
    })
    .catch(error => {
      console.log('Error al obtener los datos:', error);
      data1Span.textContent = 'Error';
      data2Span.textContent = 'Error';
      data3Span.textContent = 'Error';
      data4Span.textContent = 'Error';
    });
    fetch('/huella')
    .then(response => response.json())
    .then(data => {
      if (i==0){
  totalhuella=0;
  }
  else {
  totalhuella+=data.huella;
  }
      data5Span.textContent = totalhuella.toFixed(7);
  i=i+1;
    })
    .catch(error => {
      console.log('Error al obtener los datos:', error);
      data5Span.textContent = 'Error';
    });
    fetch('/huella1')
    .then(response => response.json())
    .then(data => {
      if (j==0){
  totalhuella1=0;
  }
  else {
  totalhuella1+=data.huella;
  }
      data6Span.textContent = totalhuella1.toFixed(7);
  j=j+1;
    })
    .catch(error => {
      console.log('Error al obtener los datos:', error);
      data6Span.textContent = 'Error';
    });

  };
setInterval(updateData, 10000);