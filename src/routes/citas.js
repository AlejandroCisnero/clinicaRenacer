var express = require('express');
var router = express.Router();
const moment = require('moment');
/*Controladores de rutas via GET o POST*/
router.get('/citas',(req, res) => {
    res.render('citas.html',{title:"Citas",ruta:req.url});/*funcion render del objeto res que devuelve el archivo index.ejs y lo evalua para colocarle la variable Contact en donde corresponda*/
  });
  router.get("/citas/add",(req, res) => {
    res.render('citas.html',{title:"Cita - Paciente",ruta:req.url,estado:'neutral',sujeto:null});/*funcion render del objeto res que devuelve el archivo index.ejs y lo evalua para colocarle la variable Contact en donde corresponda*/
  });
  router.get("/citas/search", (req, res) => {
    res.render("citas.html", { ruta: req.url, title: 'Citas - Paciente', sujeto: null, estado: 'neutral' });
  });
  router.get('/citas/citaAgend/:identificacion', (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select idP, nombre, identificacion, sexo, apellido from paciente where idP=" + req.params.identificacion + "", (err, result) => {
          if (err) {
            throw err;
          } else {
            request.query("select id, nombre, apellido, especialidad from doctor", (err, resultDoc) => {
              if (err) {
                console.log('Aqui es');
                throw err;
              } else {
                res.render('citas.html', { estado: 'neutral', ruta: '/citas/add', title: 'Citas - Agenda', sujeto2: resultDoc, sujeto: result.recordset[0] });
                pool.close();
              }
            });
          }
        });
      }
    });
  });
  router.post("/citas/search", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select idP,nombre,apellido,sexo,identificacion,ciudad,barrio,telefono from paciente where nombre LIKE '%" + req.body.subject + "%' or identificacion LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            throw err;
          } else {
            res.render("citas.html", { ruta: req.url, title: "Citas - Agregar", sujeto: result, estado: 'neutral' });
            pool.close();
          }
        });
      }
    });
  });
  router.get("/citas/lookup", (req, res) => {
    res.render("citas.html", { estado: 'neutral', sujeto: null, title: 'Citas - Buscar', ruta: '/citas/lookup' });
  });
  router.post("/citas/lookup", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select idP,nombre,apellido,sexo,identificacion,ciudad,barrio,telefono from paciente where nombre LIKE '%" + req.body.subject + "%' or identificacion LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            throw err;
          } else {
            //console.log(result);
            res.render("citas.html", { ruta: req.url, title: "Citas - Buscar", sujeto: result, estado: 'neutral' });
            pool.close();
          }
        });
      }
    });
  });
  router.get("/citas/citasLookUp/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      console.log(req.params.identificacion);
      if (err) {
        throw err;
      } else {
        request.query("select nombre from paciente where idP=" + req.params.identificacion + "", (err, resultPac) => {
          if (err) {
            throw err;
          } else {
            if (result.recordset == 0) {
              res.render("citas.html", { sujeto2: null, ruta: "showCites", title: "Citas - Paciente" });
            } else {
              request.query("select nombrePac,apellidoPac,nombreDoc,concepto,fecha,hora from cita where nombrePac='" + resultPac.recordset[0].nombre + "'", (err, result) => {
                if (err) {
                  throw err;
                } else {
  
                  console.log(result.recordset[0].fecha);
                  res.render("citas.html", { sujeto2: result, ruta: "showCites", title: "Citas - Paciente", moment: moment });
                  pool.close();
                }
              });
  
            }
          }
        });
      }
    });
  });
  router.post("/agendCita", (req, res) => {
    console.log(req.body);
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select nombre from doctor where id=" + req.body.docId + "", (err, result) => {
          console.log(result);
          if (err) {
            throw err;
          } else {
            console.log(req.body.citaFecha);
            request.query("insert into cita(nombrePac,apellidoPac,nombreDoc,fecha,concepto,estado,hora) values('" + req.body.userName + "','" + req.body.userLastName + "','" + result.recordset[0].nombre + "','" + req.body.citaFecha + "','" + req.body.citaConcept + "'," + 1 + ",'" + req.body.citaHora + "')", async (err, result) => {
              if (err) {
                res.render("citas.html", { ruta: "/citas/search", title: "Citas - Añadida", sujeto: null, estado: 'Failed' });//Esta linea no se ejecuta en el servidor debido a JQuery, lo hace el en el navegador
                pool.close();
              } else {
                res.render("citas.html", { ruta: "/citas/search", title: "Citas - Añadida", sujeto: null, estado: 'Success' });//Esta linea no se ejecuta en el servidor debido a JQuery, lo hace el en el navegador
                pool.close();
              }
            });
          }
        });
      }
    });
  });
  router.get("/citas/pendientes", (req, res) => {
    res.render("citas.html", { ruta: req.url, title: "Citas - Pendientes", sujeto: null, estado: "neutral" });
  });
  router.post("/citas/pendientes", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select idP,nombre,apellido,sexo,identificacion,ciudad,barrio,telefono from paciente where nombre LIKE '%" + req.body.subject + "%' or identificacion LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            throw err;
          } else {
            res.render("citas.html", { ruta: "/citas/pendientes", title: "Citas - Pendientes", sujeto: result, estado: 'neutral' });
            pool.close();
          }
        });
      }
    });
  });
  router.get("/citas/citaPendient/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select nombre from paciente where idP=" + req.params.identificacion + "", (err, resultPac) => {
          if (err) {
            throw err;
          } else {
            if (result.recordset == 0) {
              res.render("citas.html", { sujeto2: null, ruta: "showPendientCites", title: "Citas - Paciente" });
            } else {
              request.query("select nombrePac,apellidoPac, identificacion, nombreDoc,concepto,fecha,hora, estado from cita inner join paciente on cita.nombrePac=paciente.nombre where nombrePac='" + resultPac.recordset[0].nombre + "' and estado=1", (err, result) => {
                if (err) {
                  res.render("citas.html", { sujeto2: result, ruta: "showPendientCites", title: "Citas - Paciente", moment: moment, estado: 'Failed' });
                } else {
                  res.render("citas.html", { sujeto2: result, ruta: "showPendientCites", title: "Citas - Paciente", moment: moment, estado: 'Success' });
                  pool.close();
                }
              });
            }
          }
        });
      }
    });
  });
  router.get("/citas/reprogramar", (req, res) => {
    res.render("citas.html", { ruta: req.url, title: "Citas - Reprogramar", sujeto: null, estado: "neutral" });
  });
  router.post("/citas/reprogramar", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select idP,nombre,apellido,sexo,identificacion,ciudad,barrio,telefono from paciente where nombre LIKE '%" + req.body.subject + "%' or identificacion LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            throw err;
          } else {
            res.render("citas.html", { ruta: "/citas/reprogramar", title: "Citas - Pendientes", sujeto: result, estado: 'neutral' });
            pool.close();
          }
        });
      }
    });
  });
  router.get("/citas/citaRepro/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select nombre from paciente where idP=" + req.params.identificacion + "", (err, resultPac) => {
          if (err) {
            throw err;
          } else {
            if (result.recordset == 0) {
              res.render("citas.html", { sujeto2: null, ruta: "showPacientCitesR", title: "Citas - Paciente" });
            } else {
              request.query("select id, nombrePac,apellidoPac,nombreDoc,concepto,fecha,hora, estado from cita where nombrePac='" + resultPac.recordset[0].nombre + "'", (err, result) => {
                if (err) {
                  throw err;
                } else {
                  res.render("citas.html", { sujeto2: result, ruta: "showPacientCitesR", title: "Citas - Paciente", moment: moment, estado: 'neutral' });
                  pool.close();
                }
              });
            }
          }
        });
      }
    });
  });
  router.get("/citarepro/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select id, nombrePac, nombreDoc, apellidoPac, concepto, hora, fecha from cita where id=" + req.params.identificacion + "", (err, result) => {
          if (err) {
            throw err;
          } else {
            console.log(result);
            request.query("select nombre, apellido, identificacion, sexo from paciente where nombre='" + result.recordset[0].nombrePac + "'", (err, result2) => {
              if (err) {
                throw err;
              } else {
                request.query("select id, nombre, apellido, especialidad from doctor", (err, resultDoc) => {
                  res.render("citas.html", { ruta: 'citasForEditCard', sujeto: result2.recordset[0], sujeto2: resultDoc, sujeto3: result.recordset[0], title: 'Citas - Reprogramacion' });
                  pool.close();
                });
              }
            });
  
          }
  
        });
      }
    });
  });
  router.post("/agendCitaUpdate", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select nombre from doctor where id=" + req.body.docId + "", (err, result) => {
          console.log(result);
          if (err) {
            throw err;
          } else {
            console.log(req.body.citaFecha);
            request.query("update cita set nombrePac='" + req.body.userName + "',apellidoPac='" + req.body.userLastName + "',nombreDoc='" + result.recordset[0].nombre + "',fecha='" + req.body.citaFecha + "',concepto='" + req.body.citaConcept + "',estado=1,hora='" + req.body.citaHora + "' where id = " + req.body.citaId + "", (err, result) => {
              if (err) {
                res.render("citas.html", { ruta: "/citas/reprogramar", title: "Citas - actualizada", sujeto: null, estado: 'Failed' });//Esta linea no se ejecuta en el servidor debido a JQuery, lo hace el en el navegador
                pool.close();
              } else {
                res.render("citas.html", { ruta: "/citas/reprogramar", title: "Citas - actualizada", sujeto: null, estado: 'Success' });//Esta linea no se ejecuta en el servidor debido a JQuery, lo hace el en el navegador
                pool.close();
              }
            });
          }
        });
      }
    });
  });
  router.get("/citas/delete", (req, res) => {
    res.render("citas.html", { ruta: req.url, sujeto: null, estado: 'neutral', title: 'Citas - Eliminar' });
  });
  router.post("/citas/delete", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select idP,nombre,apellido,sexo,identificacion,ciudad,barrio,telefono from paciente where nombre LIKE '%" + req.body.subject + "%' or identificacion LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            throw err;
          } else {
            console.log(result);
            res.render("citas.html", { ruta: "/citas/delete", title: "Citas - Eliminar", sujeto: result, estado: 'neutral' });
            pool.close();
          }
        });
      }
    });
  });
  router.get("/citas/citaDelete/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select nombre from paciente where idP=" + req.params.identificacion + "", (err, resultPac) => {
          if (err) {
            throw err;
          } else {
            if (result.recordset == 0) {
              res.render("citas.html", { sujeto2: null, ruta: "citasDeleteShow", title: "Citas - Paciente", estado: 'Failed' });
            } else {
              request.query("select id,nombrePac,apellidoPac,nombreDoc,concepto,fecha,hora, estado from cita where nombrePac='" + resultPac.recordset[0].nombre + "'", (err, result) => {
                if (err) {
                  res.render("citas.html", { sujeto2: result, ruta: "citasDeleteShow", title: "Citas - Paciente", moment: moment, estado: 'Failed' });
                } else {
                  res.render("citas.html", { sujeto2: result, ruta: "citasDeleteShow", title: "Citas - Paciente", moment: moment, estado: 'neutral' });
                  pool.close();
                }
              });
            }
          }
        });
      }
    });
  });
  router.get("/deleteCite/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      request.query("delete cita where id=" + req.params.identificacion + "", (err, result) => {
        if (err) {
          res.render("citas.html", { ruta: "/citas/delete", estado: 'Failed', sujeto: null, title: "Citas - Eliminada" });
        } else {
          res.render("citas.html", { ruta: "/citas/delete", estado: 'Success', sujeto: null, title: "Citas - Eliminada" });
        }
      });
    });
  });
  module.exports = router;