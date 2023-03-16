// Define a function called "updateData" that will be used to fetch new data from the server and update the page
function updateData() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const data = this.responseText.split(';');
      const ul = document.getElementById('data');
      ul.innerHTML = '';
      for (let i = data.length - 1; i >= 0; i--) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(data[i]));
        ul.appendChild(li);
      }
    }
  };
  // Open a GET request to the "/data" endpoint on the server
  req.open('GET', '/data', true);
  req.send();
}
setInterval(updateData, 10000);