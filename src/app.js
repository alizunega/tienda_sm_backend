const express = require("express");

const app = express();
const PORT = 8080;
const fs = require("fs");

const http = require("http");
const os = require("os");

const pathFile = "./public/index.html";
const html = fs.readFileSync(pathFile);

// const url = "https://osvaldovarela.github.io/tienda_SweetMoon/";

app.use(express.static("public"));

app.get("/productos", (req, res) => {
  res.end(html);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
