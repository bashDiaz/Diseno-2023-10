const express = require("express");

// server is created
const app = express();
const path = require("path");
app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});
app.listen(1234, () => {
  console.log("Server running on port 1234");
}   );

app.use(express.static(__dirname + "/static"));
