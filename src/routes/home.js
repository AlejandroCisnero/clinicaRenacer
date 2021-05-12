var express = require('express');
var router = express.Router();
router.get("/home", (req, res) => {
    res.render("index.html", { estado: 'neutral', title: 'Usuario sesion' })
  });
  module.exports = router;