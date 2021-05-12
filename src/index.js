const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
router = express.Router();


/*Connfiguracion de variables*/
app.set('port',8080);//estableciendo la propiedad port para el objeto appp, con el valor de 8080
app.engine('html',require('ejs').renderFile);//asignar el motor de plantillas EJS a archivos ".html"
app.set('view engine','ejs');//estableciendo la propiedad view engine para el objeto app, con el valor ejs, que es el motor de plantilla
app.set('views',path.join(__dirname,'/views'));//estableciendo la propiedad views para el objeto app, con el valor de una ruta, que ubica las vistas

/*MiddleWare*/
app.use(bodyParser.urlencoded({extended: false}));

/*static files*/
app.use(express.static(path.join(__dirname,'public')));

/*rutas*/
app.use(require('./routes/home.js'));
app.use(require('./routes/citas.js'));
app.use(require('./routes/userValidate.routes.js'))
app.use(require('./routes/doctor.routes.js'))
app.use(require('./routes/paciente.routes.js'))


/*server escuchando*/
app.listen(app.get('port'),()=>{console.log(`Servidor escuchando en http://localhost:${app.get('port')}`);});
