// Insert all const that server needs including express, socket and mysql
const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');
const mysql = require('mysql');

// Variable data empty is inserted
let data1, data2, data3, data4;

// Other files that are complement of index are located in static
app.use(express.static(__dirname + "/static"));

// The server is listening and sending information to console
server.on('listening', async () => {
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

// The server is on and it receive messages that are separated into splits.
server.on('message', (msg) => {
  const data = msg.toString('utf-8').split(';');
  const data1 = parseFloat(data[0]);
  const data2 = parseFloat(data[1]);
  const data3 = data[2];
  const data4 = data[3];
  console.log(`Data received: ${data1}, ${data2}, ${data3}, ${data4}`);

  // insert data to database
  const sql = "INSERT INTO datos_gps (Latitud, Longitud, Fecha, Hora) VALUES (?, ?, ?, ?)";
  const values = [data1, data2, data3, data4];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log("Error inserting data into MySQL database: " + error);
    } else {
      console.log("Data inserted successfully!");
    }
  });
});

app.get('/linea', (req, res) => {
  const query = 'SELECT Latitud, Longitud FROM datos_gps ORDER BY id DESC LIMIT 50';

  connection.query(query, (error, rows) => {
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    } else {
    console.log('Resultados del query: ', rows);

    const values = rows.map(obj => [parseFloat(obj.Latitud), parseFloat(obj.Longitud)]);

    res.json({
      rows: values
    });
    }
  });
});


app.get('/data', (req, res) => {
  const myData = [data1, data2, data3, data4];
  // use res.json() to send the data as a JSON response to the client
  res.json(myData);
});

// The changes are inserted in index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
