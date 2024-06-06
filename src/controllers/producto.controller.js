const Producto = require("../models/producto.model.js");

// Crea y guarda un nuevo Producto
exports.create = (req, res) => {
  // valida la request
  if (!req.body) {
    res.status(400).send({
      message: "No puede crear un producto vacio.",
    });
  }

  // crea producto
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    urlfoto: req.body.urlfoto || false,
  });

  // guarda producto en la bd
  Producto.create([producto], (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el producto.",
      });
    else res.send(data);
  });
};

// Traer todos los productos de la bd (con condicion).
exports.findAll = (req, res) => {
  const idproducto = req.query.idproducto;

  Producto.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al traer los productos.",
      });
    else res.send(data);
  });
};

// Encontrar un producto por id
exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el producto con id ${req.params.idproducto}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al traer el producto con id: " + req.params.idproducto,
        });
      }
    } else res.send(data);
  });
};

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Un error ocurrió al crear el producto.",
//       });
//     else res.send(data);
//   });
// };

// Modificar producto segun id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  console.log(req.body);

  Producto.updateById(
    req.params.idproducto,
    new Producto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró el producto con id  ${req.params.idproducto}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error al intentar modificar el producto con id: " +
              req.params.idproducto,
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar el producto con un id especifico
exports.delete = (req, res) => {
  Producto.remove(req.params.idproducto, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el producto con id ${req.params.idproducto}.`,
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo eliminar el producto con id: " + req.params.idproducto,
        });
      }
    } else res.send({ message: `El producto se eliminó satisfactoriamente!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el producto.",
      });
    else
      res.send({
        message: `Todos los productos fueron eliminados satisfactoriamente!`,
      });
  });
};
