// Insert all const that server needs including express, socket and mysql
const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
app.use(bodyParser.json());
app.use(cookieParser());

// Variable data empty is inserted
let data1, data2, data3, data4, data5;

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

app.get('/id', (req, res) => {
  const query = 'SELECT iden FROM datos_gps ORDER BY id DESC LIMIT 1';

  connection.query(query, (error, rows) => {
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    } else {
    
      const value = parseFloat(rows[0].iden);
      if (value == 1){
        
      }
      res.json({
        id: value
      });
    }
  });
});
let fecha_hora_recientes = [];
app.get('/huella', (req, res) => {
  let huella=0;
  const query = 'SELECT Latitud, Longitud FROM datos_gps WHERE iden = 1 ORDER BY id DESC LIMIT 2';
  const consumo = 16; // km/litro
  const emisiones = 0.144; // Kg CO2/Litro

  connection.query(query, (error, rows) => {
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    } else {
      const lat1 = parseFloat(rows[1].Latitud);
      const lon1 = parseFloat(rows[1].Longitud);
      const lat2 = parseFloat(rows[0].Latitud);
      const lon2 = parseFloat(rows[0].Longitud);

      const R = 6371; // Radio de la Tierra en km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      const huella = (distance / consumo) * emisiones;
      
      res.json({
        huella: huella
      });
    }
  });
});

app.get('/huella1', (req, res) => {
  let huella=0;
  const query = 'SELECT Latitud, Longitud FROM datos_gps WHERE iden = 2 ORDER BY id DESC LIMIT 2';
  const consumo = 16; // km/litro
  const emisiones = 0.144; // Kg CO2/Litro

  connection.query(query, (error, rows) => {
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    } else {
      const lat1 = parseFloat(rows[1].Latitud);
      const lon1 = parseFloat(rows[1].Longitud);
      const lat2 = parseFloat(rows[0].Latitud);
      const lon2 = parseFloat(rows[0].Longitud);

      const R = 6371; // Radio de la Tierra en km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      const huella = (distance / consumo) * emisiones;
      
      res.json({
        huella: huella
      });
    }
  });
});

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
let huellaTotal = null;

app.get("/huella_total", (req, res) => {
  if (huellaTotal !== null) {
    res.json({ huellaTotal: huellaTotal });
    console.log('La huella total es ', huellaTotal);
  } else {
    res.status(404).send("La huella total no ha sido calculada todavía.");
  }
});
app.get("/consultar", (req, res) => {
  const consumo = 16; // km/litro
  const emisiones = 0.144; // Kg CO2/Litro
  const fecha_inicio = req.query.fecha_inicio;
  const fecha_final = req.query.fecha_final;
  const hora_inicio = req.query.hora_inicio;
  const hora_final = req.query.hora_final;
  const vehiculo = req.query.vehicle;
  const vector = [fecha_inicio, fecha_final, hora_inicio, hora_final];

  // Crear la consulta SQL con los parámetros de fecha y hora
  const query = `SELECT Latitud, Longitud FROM datos_gps WHERE Fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}' AND ((Fecha = '${fecha_inicio}' AND Hora >= '${hora_inicio}') OR (Fecha > '${fecha_inicio}' AND Fecha < '${fecha_final}') OR (Fecha = '${fecha_final}' AND Hora <= '${hora_final}')) AND iden = '${vehiculo}'ORDER BY id DESC`;

  connection.query(query, (error, rows) => {
    if (error) {
      console.error("Error al hacer el query: ", error);
      res.status(500).send("Error al hacer el query");
    } else {
      huellaTotal = 0;
      let puntoAnterior = null;
      for (let i = 0; i < rows.length; i++) {
        const puntoActual = {
          lat: parseFloat(rows[i].Latitud),
          lon: parseFloat(rows[i].Longitud)
        };
        if (puntoAnterior) {
          const distancia = calcularDistancia(puntoAnterior, puntoActual);
          const huella = (distancia / consumo) * emisiones;
          huellaTotal += huella;
        }
        puntoAnterior = puntoActual;
      }
      
      values = rows.map(obj => [
        parseFloat(obj.Latitud),
        parseFloat(obj.Longitud)
      ]); // actualizar los valores más recientes
      
      fecha_hora_recientes = [fecha_inicio, fecha_final, hora_inicio, hora_final, vehiculo];
      console.log(vector);
      
      res.json({
        rows: values
      });
    }
  });
});

let values = []; // variable global para almacenar los valores de la consulta más reciente


// ruta para obtener los valores de la consulta más reciente
app.get('/linea', (req, res) => {
  console.log(values);
  res.json({
    rows: values
  });
});





function calcularDistancia(punto1, punto2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRadians(punto2.lat - punto1.lat);
  const dLon = toRadians(punto2.lon - punto1.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(punto1.lat)) * Math.cos(toRadians(punto2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}



app.post('/p4', (req, res) => {
  
  const consumo = 16; // km/litro
  const emisiones = 0.144; // Kg CO2/Litro
  console.log("Fecha final ", fecha_hora_recientes[0]);
  console.log("Fecha inicial ", fecha_hora_recientes[1]);
  const latitud = req.body.lat;
  const longitud = req.body.lng;
  let fecha_inicio = fecha_hora_recientes[0]|| '2023-03-01';
  let fecha_final = fecha_hora_recientes[1]|| '2023-04-08';
  const hora_inicio = fecha_hora_recientes[2] || '00:00:01';
  const hora_final = fecha_hora_recientes[3] || '23:59:59';
  const vehiculo = fecha_hora_recientes[4] || '0';
  
  if (fecha_hora_recientes[0]=='2023-02-09'){
    console.log('LIMPIADO');
    fecha_inicio = '2023-03-01';
    fecha_final =  '2023-04-10';
  }
  
  
  console.log('Nueva latitud:', latitud);
  console.log('Nueva longitud:', longitud);


  // Hacer consulta a la base de datos

  const query = `SELECT Fecha, Hora, Latitud, Longitud, 
                 (6371000 * acos(cos(radians(${latitud})) 
                  * cos(radians(Latitud)) 
                  * cos(radians(Longitud) 
                  - radians(${longitud})) 
                  + sin(radians(${latitud})) 
                  * sin(radians(Latitud)))) AS distance 
                  FROM datos_gps WHERE Fecha BETWEEN '${fecha_inicio}' AND '${fecha_final}' AND ((Fecha = '${fecha_inicio}' AND Hora >= '${hora_inicio}') OR (Fecha > '${fecha_inicio}' AND Fecha < '${fecha_final}') OR (Fecha = '${fecha_final}' AND Hora <= '${hora_final}')) AND iden = '${vehiculo}'  
                 HAVING distance <= 500
                 ORDER BY id DESC`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al hacer el query: ', error);
      res.status(500).send('Error al hacer el query');
    } else { 
      huellaTotal = 0;
      let puntoAnterior = null;
      for (let i = 0; i < results.length; i++) {
        const puntoActual = {
          lat: parseFloat(results[i].Latitud),
          lon: parseFloat(results[i].Longitud)
        };
        if (puntoAnterior) {
          const distancia = calcularDistancia(puntoAnterior, puntoActual);
          const huella = (distancia / consumo) * emisiones;
          huellaTotal += huella;
        }
        puntoAnterior = puntoActual;
      }
      console.log(results);
      res.send(results);
      
    }   
  });
});








app.get('/reset-values', (req, res) => {
  // Restablece los valores a sus estados iniciales
  values = [];
  huellaTotal = 0;

  // Envía una respuesta JSON indicando que los valores se han restablecido correctamente
  res.json({ success: true });
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
  data5 = data[4]
  console.log(`Data received: ${data1}, ${data2}, ${data3}, ${data4}, ${data5} `);

  // insert data to database
  const sql = "INSERT INTO datos_gps (Latitud, Longitud, Fecha, Hora, iden) VALUES (?, ?, ?, ?, ?)";
  const values = [data1, data2, data3, data4, data5];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log("Error inserting data into MySQL database: " + error);
    } else {
      console.log("Data inserted successfully!");
    }
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
});



app.get('/v1', (req, res) => {
  const vehiculo = req.query.vehiculo; // Obtener el valor del parámetro "vehiculo" de la solicitud

  console.log(vehiculo);

  // Enviar el valor del vehículo a la otra API en formato JSON
  axios
    .post('/carro', { vehiculo }) // Reemplaza "http://localhost:3000" con la URL correcta de la otra API
    .then((response) => {
      console.log('Respuesta de la otra API:', response.data);
      res.cookie('ultimoValor', vehiculo); // Almacenar el último valor en una cookie
      res.json({ valor: vehiculo });
    })
    .catch((error) => {
      console.error('Error al enviar el valor del vehículo a la otra API:', error);
      res.status(500).json({ error: 'Error al enviar el valor del vehículo' });
    });
});
let ultimoValor=0;
app.post('/carro', (req, res) => {
  const vehiculo = req.body.vehiculo;

  // Actualizar el último valor recibido
  ultimoValor = vehiculo;

  // Realiza cualquier operación adicional que necesites con el valor del vehículo

  res.json({ ultimoValor });
});

app.post('/ultimoValor', (req, res) => {
  const ultimoValorCookie = req.cookies.ultimoValor;
  const vehiculo = req.body.vehiculo;

  if (vehiculo) {
    // Actualizar el último valor recibido
    ultimoValor = vehiculo;
    res.cookie('ultimoValor', ultimoValor); // Almacenar el último valor en una cookie
  }

  if (ultimoValorCookie) {
    res.json({ ultimoValor: ultimoValorCookie });
  } else {
    res.json({ ultimoValor });
  }
});

// The changes are inserted in index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/historico.html');
});
app.get('/historico.html', (req, res) => {
  res.sendFile(__dirname + '/historico.html');
});
app.get('/historico1.html', (req, res) => {
  res.sendFile(__dirname + '/historico.html');
});
app.get('/treal.html', (req, res) => {
  res.sendFile(__dirname + '/treal.html');
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