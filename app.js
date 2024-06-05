const express = require("express");
const { publicDecrypt } = require("node:crypto");
const app = express();
const PORT = 8080;
const http = require("node:http");
const os = require("node:os");
// const url = "https://osvaldovarela.github.io/tienda_SweetMoon/";

app.use(express.static("public"));

app.get("/productos", (req, res) => {
  res.sendFile(__dirname + "./productos.html");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
