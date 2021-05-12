var express = require('express');
var router = express.Router();
const mssql = require('mssql');
router.post("/userValidate", (req, res) => {
    console.log(req.body);
    pool = new mssql.ConnectionPool({
      user: req.body.user,
      password: req.body.password,
      server: 'localhost',
      port: 1444,
      database: 'dentalClinic',
      options: {
        "enableArithAbort": true
      }
  
    });
    request = new mssql.Request(pool);
    pool.connect((err, result) => {
      if (err) {
        console.log(result);
        console.log(err);
        res.render("index.html", { estado: 'Failed', title: 'Usuario sesion' });
      } else {
        res.render("home.html", { estado: 'Success', title: 'Usuario sesion' });
  
      }
    });
  });
  module.exports = router;