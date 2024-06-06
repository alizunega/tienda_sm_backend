module.exports = (app) => {
  const producto = require("../controllers/producto.controller.js");

  var router = require("express").Router();

  // crea un nuevo producto
  router.post("/producto/new", producto.create);

  // trae todos los productos
  router.get("/producto/traer", producto.findAll);

  // //
  // router.get("/published", producto.findAllPublished);

  // traer producto por id
  router.get("/:id", producto.findOne);

  // actualizar producto
  router.put("/:id", producto.update);

  // elimina producto segun id
  router.delete("/:id", producto.delete);

  // Elimina todos los productos
  router.delete("/", producto.deleteAll);

  app.use("/api/producto", router);
};
