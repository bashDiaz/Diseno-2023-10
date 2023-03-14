const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express')
const app = express()
const mysql = require('mysql');

app.use(express.static(__dirname + "/static"));
const express = require('express');
const app = express();
app.use(express.static('public'));
let info = [];

// Listen for incoming messages on the server and adding to a server
app.use(express.static('public'));
function updateMap(lat, lng) {
  // Code to update the map with the new latitude and longitude
}
server.on('message', (msg, rinfo) => {
  const data = msg.toString();
const fields = data.split(';');
  info = fields;
  const dataToInsert = [fields[0], fields[1], fields[2], fields[3]];
  insertData(dataToInsert);
 insertData(dataToInsert);
const lat = parseFloat(fields[0]);
  const lon = parseFloat(fields[1]);
  updateMap(lat, lon);

});
app.get('/data', (req, res) => {
res.json(info);
});

// Listen for the server to start listening
server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});
server.bind(1234);

// Listen for incoming requests on port 80
app.listen(80, () => {
  console.log('HTTP server listening on port 80');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
const port = 80;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

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
  const datos = [info[0], info[1], info[2], info[3]];
  const sql = "INSERT INTO datos_gps (Latitud, Longitud, Fecha, Hora) VALUES (?, ?, ?, ?)";
  connection.query(sql, datos, (error, results, fields) => {
    if (error) {
      console.log("Error inserting data into MySQL database: " + error);
    } else {
      console.log("Data inserted successfully!");
    }
  });
}