app.get('/linea', (req, res) => {
  // Obtiene los valores de fecha y hora del query
  const fechaInicio = req.query.fecha_inicio;
  const horaInicio = req.query.hora_inicio;
  const fechaFin = req.query.fecha_fin;
  const horaFin = req.query.hora_fin;

  // Crea la consulta SQL con los parámetros de fecha y hora
  const query = `SELECT Latitud, Longitud FROM datos_gps WHERE Fecha >= '${fechaInicio} ${horaInicio}:00' AND Fecha <= '${fechaFin} ${horaFin}:00' ORDER BY id DESC LIMIT 50`;

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
