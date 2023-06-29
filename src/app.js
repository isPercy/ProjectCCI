const myconnection = require('express-myconnection');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// definicion de conexión a la base de datos
app.use(myconnection(mysql, {
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   database: 'team_z'
}, 'single'));

// configuracion de session
app.use(session({
	secret: 'secret-string-cci',
	resave: true,
	saveUninitialized: true,
   loggedin: false
}));

// Configuracion de Body-Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Iniciar el servidor
const port = 4000;
app.listen(port, () => {
   console.log(`Servidor iniciado http://localhost:${port}`);
});

//  Configura el motor de plantillas HBS
app.set('view engine', 'hbs');
//  Define la ruta para tus archivos de plantilla
app.set('views', path.join(__dirname, 'views'));
//  Configura la ubicación de tus archivos estáticos (como CSS y JS)
app.use(express.static(path.join(__dirname, 'public')));

//  Define la ubicacion de las rutas
const Router = require('./routes/LasRutasPorRol');
app.use('/', Router);