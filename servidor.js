
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

let info = [];

server.on('message', (msg, rinfo) => {
  const data = msg.toString();
  const fields = data.split(';');
  info = fields;
const dataToInsert = [fields[0], fields[1], fields[2], fields[3]];
 insertData(dataToInsert);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(1234);

const http = require('http');
const fs = require('fs');

const serverHttp = http.createServer((req, res) => {
  if (req.url === '/data') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(info.join(';'));
    res.end();
;
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write('File not found!');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  }
});

serverHttp.listen(80, () => {
  console.log('HTTP server listening on port 80');
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
