// Insert all const that server needs including express, socket and mysql
const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');
const mysql = require('mysql');
const dataElement = document.getElementById('data');

// The changes are inserted in index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Other files that are complement of index are located in static
app.use(express.static(__dirname + "/static"));

// Variable data empty is inserted 
let data1 = null;
let data2 = null;
let data3 = null;
let data4 = null;
let info = [];

// The server is on and it receive messages that are separated into splits. Intervals of 10 seconds
function refreshData() {
  server.on('message', (msg, rinfo) => {
    const data = msg.toString().split(';');
    const data1 = parseFloat(data[0]);
    // const lat = parseFloat(data[0]);
    const data2 = parseFloat(data[1]);
    // const lng = parseFloat(data[1]);
    const data3 = data[2];
    // const fecha = moment(data3).format('MMM DD, YYYY');
    const data4 = data[3];
    // const hora = moment(data4, 'HH:mm:ss').format('hh:mm A');
    console.log(`Data received: ${data1}, ${data2}, ${data3}, ${data4}`);
    // console.log(`Data received: ${lat}, ${lng}, ${fecha}, ${hora}`);
    const dataString = `Data received: ${data1}, ${data2}, ${data3}, ${data4}`;
    io.emit('data', dataString);
    console.log('Data displayed');
  });
} setInterval(refreshData, 10000);

// Data is converted in JSON
app.get('/data', (req, res) => {
  res.json({
    data1: data1,
    data2: data2,
    data3: data3,
    data4: data4
  });
});

// The server is listening and sending information to console
server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

// A specific port is assigned
server.bind(1234);

app.listen(80, () => {
  console.log('HTTP server listening on port 80');
});

// A connection with mysql is created, with credentials
const connection = mysql.createConnection({
  host: 'mysql1.czemchtiopw1.us-east-1.rds.amazonaws.com',
  user: 'admin', 
  password: 'prueba123',
  database: 'mysql1'
});
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database: ' + error.stack);
    return;
  }
  console.log('Connected to MySQL database with id ' + connection.threadId);
});

// Data is inserted to database with mysql
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