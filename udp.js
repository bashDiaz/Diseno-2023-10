// Define a function called "updateData" that will be used to fetch new data from the server and update the page
function updateData() {
  // Create a new XMLHttpRequest object
  const req = new XMLHttpRequest();
  // Define a callback function to execute when the XMLHttpRequest object changes state
  req.onreadystatechange = function() {
    // If the XMLHttpRequest object has completed its request and received a successful response...
    if (this.readyState === 4 && this.status === 200) {
      // Split the response text into an array of strings using semicolons as delimiters
      const data = this.responseText.split(';');
      // Get a reference to the <ul> element on the page with an ID of "data"
      const ul = document.getElementById('data');

      // Clear the <ul> element of any existing child nodes
      ul.innerHTML = '';
      // Loop through the data array in reverse order and create a new <li> element for each string
      for (let i = data.length - 1; i >= 0; i--) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(data[i]));
        ul.appendChild(li);
      }

      // Create a table with data
      const table = document.createElement('table');
      table.innerHTML = '<tr><th>Dato</th></tr>';
      for (let i = data.length - 1; i >= 0; i--) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.appendChild(document.createTextNode(data[i]));
      tr.appendChild(td);
      table.appendChild(tr);
      }
      // Dates are located by ID data-table
      const container = document.getElementById('data-table');
      container.innerHTML = '';
      container.appendChild(table);
    }
  };
  // Open a GET request to the "/data" endpoint on the server
  req.open('GET', '/data', true);
  // Send the request
  req.send();
}
// Call the "updateData" function every 10 seconds using the setInterval method
setInterval(updateData, 10000);