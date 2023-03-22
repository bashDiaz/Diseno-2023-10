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

// The server is on and it receive messages that are separated into splits.
  server.on('message', (msg) => {
  const data = msg.toString('utf-8').split(';');
  data1 = parseFloat(data[0]);
  data2 = parseFloat(data[1]);
  data3 = data[2];
  data4 = data[3];
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


});

app.get('/linea', (req, res) => {
  // Obtiene los valores de fecha y hora del query
  const fechaInicio = req.query.fecha_inicio || '2023-03-21';
  const horaInicio = req.query.hora_inicio || '10:30:00';
  const fechaFin = req.query.fecha_fin || '2023-03-21';
  const horaFin = req.query.hora_fin || '10:50:00';

  console.log(fechaInicio);
  console.log(horaInicio);

  // Crear la consulta SQL con los parámetros de fecha y hora
  const query = `SELECT Latitud, Longitud FROM datos_gps WHERE Fecha >= '${fechaInicio}' AND Hora >= '${horaInicio}' AND Fecha <= '${fechaFin}' AND Hora <= '${horaFin}' ORDER BY id DESC`;

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
