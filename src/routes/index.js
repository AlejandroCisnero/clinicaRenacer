const express = require('express');

const router = express.Router();

/*Handler de la ruta /home*/
router.get("/index", (req, res) => {
  res.render("home.html", { estado: 'Success', title: 'Usuario sesion' })
});


router.get("/inventario", (req, res) => {
  res.render('inventario.html', { title: "Inventario" });/*funcion render del objeto res que devuelve el archivo index.ejs y lo evalua para colocarle la variable Contact en donde corresponda*/
});

/*Exportacion del objeto router, para su uso donde lo invoquen (index.js-src)*/
module.exports = router;
