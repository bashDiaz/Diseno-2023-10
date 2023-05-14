let totalhuella = 0;
let totalhuella1 = 0;
let i = 0;
let j = 0;
function updateData() {
  const data1Span = document.getElementById('data1');
  const data2Span = document.getElementById('data2');
  const data3Span = document.getElementById('data3');
  const data4Span = document.getElementById('data4');


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
    };
setInterval(updateData, 10000);