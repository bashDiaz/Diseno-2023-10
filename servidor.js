// Insert all const that server needs including express, socket and mysql
const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');
const mysql = require('mysql');

// Variable data empty is inserted
let data1 = null;
let data2 = null;
let data3 = null;
let data4 = null;
let info = [];

// The server is on and it receive messages that are separated into splits. Intervals of 10 seconds
function refreshData() {
  server.on('message', (msg, rinfo) => {
const data = msg.toString();
const fields = data.split(';');
  info = fields;
const dataToInsert = [fields[0], fields[1], fields[2], fields[3]];
 insertData(dataToInsert);
    const data1 = parseFloat(fields[0]);
    // const lat = parseFloat(data[0]);
    const data2 = parseFloat(fields[1]);
    // const lng = parseFloat(data[1]);
    const data3 = fields[2];
    // const fecha = moment(data3).format('MMM DD, YYYY');
    const data4 = fields[3];
    // const hora = moment(data4, 'HH:mm:ss').format('hh:mm A');
    console.log(`Data received: ${data1}, ${data2}, ${data3}, ${data4}`);
    // console.log(`Data received: ${lat}, ${lng}, ${fecha}, ${hora}`);
    //document.getElementById('data').innerHTML = "";
console.log(data1);
console.log(data2);
});
} setInterval(refreshData, 10000);

// The server is listening and sending information to console
server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

// A specific port is assigned
server.bind(1234);

// The changes are inserted in index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Other files that are complement of index are located in static
app.use(express.static(__dirname + "/static"));

// Data is converted in JSON
app.get('/data', (req, res) => {
  res.json({
    data1: data1,
    data2: data2,
    data3: data3,
    data4: data4
  });
});

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
const query = 'SELECT Latitud, Longitud FROM datos_gps ORDER BY id DESC LIMIT 1';
connection.query(query, function (error, results, fields) {
  if (error) throw error;
lat=results[0].Latitud;
lon=results[0].Longitud;
  console.log('Latitud:', lat);
  console.log('Longitud:', lon);
});
}
