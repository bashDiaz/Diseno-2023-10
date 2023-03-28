// Insert all const that server needs including express, socket and mysql
const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

// Variable data empty is inserted
let data1 = 'Waiting to server';
let data2 = 'Waiting to server';
let data3 = 'Waiting to server';
let data4 = 'Waiting to server';

// Other files that are complement of index are located in static
app.use(express.static(__dirname + "/static"));

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
  host: process.env.host_1,
  user: process.env.user_1,
  password: process.env.password_1,
  database: process.env.database_1
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
  data1 = parseFloat(data[0]);
  data2 = parseFloat(data[1]);
  data3 = data[2];
  data4 = data[3];
  console.log(`Data received: ${data1}, ${data2}, ${data3}, ${data4}`);

  // Insert data to database
  const sql = "INSERT INTO datos_gps (Latitud, Longitud, Fecha, Hora) VALUES (?, ?, ?, ?)";
  const values = [data1, data2, data3, data4];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log("Error inserting data into MySQL database: " + error);
    } else {
      console.log("Data inserted successfully!");
    }
  });

  // Selecting last position in lat and lng for maping (of database)
  app.get('/last', (req, res) => {
    const query = 'SELECT Latitud, Longitud FROM datos_gps ORDER BY id DESC LIMIT 1';

    connection.query(query, (error, rows) => {
      if (error) {
        console.error('Error al hacer el query: ', error);
        res.status(500).send('Error al hacer el query');
      } else {
        const values = rows.map(obj => [parseFloat(obj.Latitud), parseFloat(obj.Longitud)]);

      res.json({
        rows: values
      });
    }
  });
});
app.post('/p4', (req, res) => {
  const latitud = req.body.lat;
  const longitud = req.body.lng;

  console.log('Nueva latitud:', latitud);
  console.log('Nueva longitud:', longitud);

  // Hacer consulta a la base de datos
  const query = `SELECT Fecha, Hora FROM datos_gps WHERE Longitud > ${longitud-(-1*longitud*0.0001)} AND Longitud < ${longitud + (-1*longitud * 0.0001)} AND Latitud > ${latitud - (latitud * 0.0001)} AND Latitud < ${latitud + (latitud * 0.0001)} ORDER BY id DESC`;

  connection.query(query, (error, results) => {
    
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    }else { 
      console.log(results);
      res.send(results);
    }
   
  });
});

// Let a global variable for receive data of a new query
let values = [];

app.get("/consultar", (req, res) => {
  const fecha_inicio = req.query.fecha_inicio;
  const fecha_final = req.query.fecha_final;
  const hora_inicio = req.query.hora_inicio;
  const hora_final = req.query.hora_final;
  const vector = [fecha_inicio, fecha_final, hora_inicio, hora_final];
  
  // Create a sql query for last date and time, updating last data
  const query = `SELECT Latitud, Longitud FROM datos_gps WHERE Fecha >= '${fecha_inicio}' AND Hora >= '${hora_inicio}' AND Fecha <= '${fecha_final}' AND Hora <= '${hora_final}' ORDER BY id DESC`;
  
  connection.query(query, (error, rows) => {
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    } else {
      values = rows.map(obj => [parseFloat(obj.Latitud), parseFloat(obj.Longitud)]);

      console.log(vector);
      
      res.json({
        rows: values
      });
    }
  });
});

// Recent data goes in selected route
app.get('/linea', (req, res) => {
  console.log(values);
  res.json({
    rows: values
  });
});

// The changes are inserted in index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



// This endpoint will return the latest values of data1, data2, data3, and data4 as a JSON object
app.get('/data', (req, res) => {
  if (data1 && data2 && data3 && data4) {
    const myData = [data1, data2, data3, data4];
    res.json(myData);
  } else {
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});