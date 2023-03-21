document.addEventListener('DOMContentLoaded', () => {
  const data1Span = document.getElementById('data1');
  const data2Span = document.getElementById('data2');
  const data3Span = document.getElementById('data3');
  const data4Span = document.getElementById('data4');

  function updateData() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        data1Span.textContent = data[0];
        data2Span.textContent = data[1];
        data3Span.textContent = data[2];
        data4Span.textContent = data[3];
      });
  }

  setInterval(updateData, 10000);
});