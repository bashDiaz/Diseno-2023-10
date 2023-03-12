// Import the dgram module
const dgram = require('dgram');

// Create a UDP server using the 'udp4' protocol
const server = dgram.createSocket('udp4');

// Initialize an empty array to hold information received from UDP messages
let info = [];

// Listen for incoming messages on the server
server.on('message', (msg, rinfo) => {
  // Convert the message to a string
  const data = msg.toString();
  
  // Split the string into an array of fields, separated by ';'
  const fields = data.split(';');
  
  // Update the 'info' array with the new fields
  info = fields;
  
  // Create a new array with only the first 4 fields
  const dataToInsert = [fields[0], fields[1], fields[2], fields[3]];
  
  // Insert the data into a database
  insertData(dataToInsert);
});

// Listen for the server to start listening
server.on('listening', () => {
  // Get the address and port of the server
  const address = server.address();
  
  // Print the address and port to the console
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

// Bind the server to port 1234
server.bind(1234);

// Import the http and fs modules
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const serverHttp = http.createServer((req, res) => {
  // If the requested URL is '/data'
  if (req.url === '/data') {
    // Set the response headers to indicate plain text
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    // Write the 'info' array to the response, joined by ';'
    res.write(info.join(';'));
    
    // End the response
    res.end();
  } else {
    // Otherwise, read the 'index.html' file
    fs.readFile('index.html', (err, data) => {
      // If there was an error reading the file
      if (err) {
        // Set the response status code to 404
        res.writeHead(404);
        
        // Write a message to the response
        res.write('File not found!');
        
        // End the response
        res.end();
      } else {
        // Otherwise, set the response headers to indicate HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        
        // Write the file data to the response
        res.write(data);
        
        // End the response
        res.end();
      }
    });
  }
});

// Listen for incoming requests on port 80
serverHttp.listen(80, () => {
  console.log('HTTP server listening on port 80');
});

// Import the mysql module
const mysql = require('mysql');

// Create a new MySQL database connection
const connection = mysql.createConnection({
  host: 'mysql1.czemchtiopw1.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'prueba123',
  database: 'mysql1'
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database: ' + error.stack);
    return;
  }
  console.log('Connected to MySQL database with id ' + connection.threadId);
});

// Define a function to insert data into the MySQL database
function insertData(data) {

  // Create an array with the data to insert
  const datos = [info[0], info[1], info[2], info[3]];
  
  // Define an SQL query to insert the data
  const sql = "INSERT INTO datos_gps (Latitud, Longitud, Fecha, Hora) VALUES (?, ?, ?, ?)";
  
  // Execute the SQL query with the data and log the results
  connection.query(sql, datos, (error, results, fields) => {
    if (error) {
      console.log("Error inserting data into MySQL database: " + error);
    } else {
      console.log("Data inserted successfully!");
    }
  });
}
