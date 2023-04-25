function updateData() {
  const data1Span = document.getElementById('data1');
  fetch('/huella_total')
  .then(response => response.json())
  .then(data => {
    data1Span.textContent = data.huellaTotal;
  })
  .catch(error => console.error(error));
  
};
setInterval(updateData, 1000);