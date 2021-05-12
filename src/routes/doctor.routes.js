const express = require('express');
router = express.Router();

router.get("/doctor", (req, res) => {
    res.render('doctor.html', { title: "Doctor", ruta: '/doctor' });/*funcion render del objeto res que devuelve el archivo index.ejs y lo evalua para colocarle la variable Contact en donde corresponda*/
  });
  router.get("/doctor/add", (req, res) => {
    res.render("doctor.html", { estado: 'neutral', ruta: req.url, title: 'Doctor - Añadir' });
  });
  router.post("/newDoctor", (req, res) => {
    pool.connect((err, result) => {
      //const {userName,userLastName,userIde,userGender,userBirth,civil,userTel,userBarrio,userCiudad,userDomicilio}=req.body;
      if (err) {
        throw err;
      } else {
        //request.query("insert into paciente(nombre) values('"+req.body.userName+"')",(err, result) => {
        request.query("select nombre from doctor where nombre='" + req.body.userName + "'", (err, result) => {//Consulta para buscar al paciente
          console.log('Oye');
          if (err) {
            res.render('doctor.html', { title: "Error", ruta: '/doctor/add', estado: 'Failed' });
            pool.close();
          } else {
            if (result.recordset.length > 0) {
              res.render('doctor.html', { title: "Existe", ruta: '/doctor/add', estado: 'Failed' });//Renderiza la pagina con un mensaje de error
              pool.close();
            } else {//Si la consulta no retorna ningun registro, entonces no existe este paciente, y se puede añadir
              request.query("insert into doctor(nombre, apellido, cedula, sexo, fechNac, ciudad, telefono, domicilio, especialidad, salario) values('" + req.body.userName + "','" + req.body.userLastName + "','" + req.body.userIde + "','" + req.body.userGender + "','" + req.body.userBirth + "','" + req.body.userCiudad + "','" + req.body.userTel + "','" + req.body.userDomicilio + "','" + req.body.userEspec + "','" + req.body.userSal + "')", (err, result) => {//Inserta el paciente en la BD
                if (err) {//Si se presentan errores durante la insercion
                  res.render('doctor.html', { title: "Error", ruta: '/doctor/add', estado: 'Failed' });//Renderiza la pagina con un mensaje de error
                  pool.close();
                } else {//Si no se presentan errores durante la insercion
                  res.render('doctor.html', { title: "Doctor - Añadido", ruta: '/doctor/add', estado: 'Success' });//Renderiza la pagina con un mensaje de satisfactorio
                  pool.close();
                }
              });
            }
          }
        });
        //res.render('pacientes.html',{title:"Pacientes",ruta:req.url,estado: 'Conexion con SQL exitosa'});/*funcion render del objeto res que devuelve el archivo index.ejs y lo evalua para colocarle la variable Contact en donde corresponda*/
      }
    });
  });
  router.get("/doctor/delete", (req, res) => {
    res.render("doctor.html", { ruta: req.url, estado: 'neutral', title: 'Doctro - Eliminar', sujeto: null });
  });
  router.post("/deleteDoctor", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select id, nombre, apellido, cedula, sexo, ciudad, telefono from doctor where nombre LIKE '%" + req.body.subject + "%' or cedula LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            res.render("doctor.html", { title: 'Doctor - Lista', sujeto: result, ruta: req.url, estado: 'Failed' });
          } else {
            console.log(result.recordset.length);
            res.render("doctor.html", { title: 'Doctor - Lista', sujeto: result, ruta: req.url, estado: 'neutral' });
          }
        });
      }
    });
  });
  router.get("/doctorDelete/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(req.params.identificacion);
        request.query("delete doctor where id='" + req.params.identificacion + "'", (err, result) => {
          if (err) {
            res.render("doctor.html", { title: "Doctor - Eliminar", ruta: "/deleteDoctor", estado: 'Failed', sujeto: null });
          } else if (result.rowsAffected > 0) {
            console.log("Doctor Eliminado");
            res.render("doctor.html", { title: "Doctor - Eliminar", ruta: "/deleteDoctor", estado: 'Success', sujeto: null });
          } else if (result.rowsAffected == 0) {
            res.render("doctor.html", { title: "Doctor - Eliminar", ruta: "/deleteDoctor", estado: 'Failed', sujeto: null });
          }
        });
      }
    });
  });
  router.get("/doctor/lookup", (req, res) => {
    res.render("doctor.html", { ruta: req.url, title: "Doctor - Mostrar", sujeto: null, estado: 'neutral' });
  });
  router.post("/doctor/showAll", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        request.query("select id,nombre,apellido,sexo,cedula,ciudad,telefono from doctor where nombre LIKE '%" + req.body.subject + "%' or cedula LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            res.render("doctor.html", { ruta: "/doctor/lookup", title: "Doctor - Mostrar", sujeto: result, estado: 'Failed' });
          } else {
            console.log(pool);
            res.render("doctor.html", { ruta: "/doctor/lookup", title: "Doctor - Mostrar", sujeto: result, estado: 'neutral' });
          }
        });
      }
    });
  });
  router.get("/modifyDoctor", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        //request.query("select nombre, apellido, identificacion, sexo, ciudad, telefono from paciente where nombre='"+req.body.subject+"' or identificacion='"+req.body.subject+"' or telefono='"+req.body.subject+"'", (err,result)=>{
        request.query("select id, nombre, apellido, cedula, sexo, ciudad, telefono from doctor where nombre LIKE '%" + req.body.subject + "%' or cedula LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            res.render("doctor.html", { title: 'Doctor - Lista', sujeto: result, ruta: req.url, estado: 'Failed' });
          } else {
            console.log(result.recordset.length);
            res.render("doctor.html", { title: 'Doctor - Lista', sujeto: result, ruta: req.url, estado: 'neutral' });
          }
        });
      }
    });
  });
  router.post("/modifyDoctor", (req, res) => {
    pool.connect((err, result) => {
      if (err) {
        throw err;
      } else {
        //request.query("select nombre, apellido, identificacion, sexo, ciudad, telefono from paciente where nombre='"+req.body.subject+"' or identificacion='"+req.body.subject+"' or telefono='"+req.body.subject+"'", (err,result)=>{
        request.query("select id, nombre, apellido, cedula, sexo, ciudad, telefono from doctor where nombre LIKE '%" + req.body.subject + "%' or cedula LIKE '%" + req.body.subject + "%' or telefono LIKE '%" + req.body.subject + "%'", (err, result) => {
          if (err) {
            res.render("doctor.html", { title: 'Doctor - Lista', sujeto: result, ruta: req.url, estado: 'Failed' });
          } else {
            console.log(result.recordset.length);
            res.render("doctor.html", { title: 'Doctor - Lista', sujeto: result, ruta: req.url, estado: 'neutral' });
            pool.close();
          }
        });
      }
    });
  });
  router.get("/doctorModify/:identificacion", (req, res) => {
    pool.connect((err, result) => {
      //const {userName,userLastName,userIde,userGender,userBirth,civil,userTel,userBarrio,userCiudad,userDomicilio}=req.body;
      if (err) {
        throw err;
      } else {
        //request.query("insert into paciente(nombre) values('"+req.body.userName+"')",(err, result) => {
        request.query("select id, nombre, apellido, sexo, cedula, telefono, ciudad, domicilio, salario, especialidad from doctor where id='" + req.params.identificacion + "'", (err, result) => {//Consulta para buscar al paciente
          console.log(result);
          if (err) {
            throw err;
          } else {
            res.render("doctor.html", { userInfo: result.recordset[0], title: "Doctor - Modificar", ruta: 'userModify', estado: 'neutral' });
          }
        });
        //res.render('pacientes.html',{title:"Pacientes",ruta:req.url,estado: 'Conexion con SQL exitosa'});/*funcion render del objeto res que devuelve el archivo index.ejs y lo evalua para colocarle la variable Contact en donde corresponda*/
      }
    });
  });
  router.post("/newDoctorModified/:id", (req, res) => {
    pool.connect((err, result) => {
      //const {userName,userLastName,userIde,userGender,userBirth,civil,userTel,userBarrio,userCiudad,userDomicilio}=req.body;
      if (err) {
        throw err;
      } else {
        request.query("update doctor set nombre='" + req.body.userName + "', apellido='" + req.body.userLastName + "', cedula='" + req.body.userIde + "', sexo='" + req.body.userGender + "', salario='" + req.body.userSal + "', ciudad='" + req.body.userCiudad + "', especialidad='" + req.body.userEspec + "', telefono='" + req.body.userTel + "', domicilio='" + req.body.userDomicilio + "' where id=" + req.params.id + "", (err, result) => {//Inserta el paciente en la BD
          if (err) {//Si se presentan errores durante la actualizacion
            res.render('doctor.html', { title: "Error", ruta: '/modifyDoctor', estado: 'Failed', sujeto: null });//Renderiza la pagina con un mensaje de error
            pool.close();
          } else {//Si no se presentan errores durante la actualizacion
            res.render('doctor.html', { title: "Doctor - Actualizado", ruta: '/modifyDoctor', estado: 'Success', sujeto: null });//Renderiza la pagina con un mensaje de satisfactorio
            pool.close();
          }
        });
      }
    });
  });

  module.exports = router;