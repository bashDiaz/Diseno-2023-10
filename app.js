const express = require("express");
const app = express();
const path = require("path");

// se crea el servidor
app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});
app.listen(1234, () => {
  console.log("Server running on port 1234");
}   );

app.use(express.static(__dirname + "/static"));
