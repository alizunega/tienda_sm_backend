const sql = require("./db.js");

// constructor
const Producto = function (producto) {
  this.nombre = producto.nombre;
  this.precio = producto.precio;
  this.urlprod = producto.urlprod;
};

Producto.create = (newProducto, result) => {
  sql.query("INSERT INTO producto SET ?", newProducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("producto agregado: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.findById = (idproducto, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${idproducto}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Producto seleccionado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // no se encontro producto con ese id
    result({ kind: "not_found" }, null);
  });
};

Producto.getAll = (nombre, result) => {
  let query = "SELECT * FROM producto";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productos: ", res);
    result(null, res);
  });
};

// Tutorial.getAllPublished = (result) => {
//   sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

Producto.updateById = (idproducto, producto, result) => {
  sql.query(
    "UPDATE producto SET nombre = ?, precio = ?, urlfoto = ? WHERE id = ?",
    [producto.nombre, producto.precio, producto.urlfoto, idproducto],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se encontro producto con ese id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("producto modificado: ", {
        idproducto: idproducto,
        ...producto,
      });
      result(null, { idproducto: idproducto, ...producto });
    }
  );
};

Producto.remove = (idproducto, result) => {
  sql.query("DELETE FROM producto WHERE id = ?", idproducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no se encontro producto con ese id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`producto con id = ${idproducto} eliminado`);
    result(null, res);
  });
};

Producto.removeAll = (result) => {
  sql.query("DELETE FROM producto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Fueron eliminados ${res.affectedRows} productos`);
    result(null, res);
  });
};

module.exports = Producto;
