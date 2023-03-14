const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const express = require('express');
const app = express();
app.use(express.static('public'));
let info = [];
function updateMap(lat, lng) {
  // Code to update the map with the new latitude and longitude
}
server.on('message', (msg, rinfo) => {
  const data = msg.toString();
const fields = data.split(';');
  info = fields;
const dataToInsert = [fields[0], fields[1], fields[2], fields[3]];
 insertData(dataToInsert);
const lat = parseFloat(fields[0]);
  const lon = parseFloat(fields[1]);
  updateMap(lat, lon);

});
app.get('/data', (req, res) => {
res.json(info);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(1234);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
const port = 80;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

const mysql = require('mysql');

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
