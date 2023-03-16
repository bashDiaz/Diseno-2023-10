const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');
const mysql = require('mysql');

let data1 = null;
let data2 = null;
let data3 = null;
let data4 = null;

server.on('message', (msg, rinfo) => {
  const data = msg.toString().split(';');
  const data1 = parseFloat(data[0]);
  const data2 = parseFloat(data[1]);
  const data3 = parseFloat(data[2]);
  const data4 = parseFloat(data[3]);
  console.log(`Data received: ${data1}, ${data2}, ${data3}, ${data4}`);
  document.getElementById('data').innerHTML = result;
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(1234);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(_dirname + "/static"));

app.get('/data', (req, res) => {
  res.json({
    data1: data1,
    data2: data2,
    data3: data3,
    data4: data4
  });
});

serverHttp.listen(80, () => {
  console.log('HTTP server listening on port 80');
});

// Refresh data every 10 seconds
setInterval(() => {
  server.send('refresh', 0, 'refresh'.length, 3333, 'localhost', (err, bytes) => {
    if (err) {
      console.log(`Error refreshing data: ${err.message}`);
    } else {
      console.log(`Data refreshed`);
    }
  });
}, 10000);

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