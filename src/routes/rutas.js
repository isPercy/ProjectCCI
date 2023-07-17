const express = require('express');
const router = express.Router();
const { checkRole } = require('./middleware');
const { auth, logout, guardarNuevoUsuario } = require("../controllers/LoginController");
const { getSolicitudes, DeleteSolicitud, RevisarSolicitud } = require('../controllers/SolicitudesController');
const { getUsuarios, DeleteUsuario, EditUsuarios, GuardarRol } = require('../controllers/UsersListController');
const { SaveSolicited, getSolicitudThisUser } = require('../controllers/newSolicitudController');
const { CallDataset } = require('../controllers/CallDataDashboard.js');
//#region Rutas para visitantes
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('home', {
      layout: 'layouts/navbar',
      session: req.session.loggedin,
      usuario: req.session.user['Nombre']+' ',
      rolsesion1: 1 === req.session.user['ID_Rol'],
      rolsesion2: 2 === req.session.user['ID_Rol'],
      rolsesion3: 3 === req.session.user['ID_Rol'],
      rolsesion4: 4 === req.session.user['ID_Rol'],
    });
  }
  else {
    res.render('home', {
      layout: 'layouts/navbar',
      session: req.session.loggedin
    });
  }
});
router.get('/login', (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.loggedin) {
    res.render('login/login', {
      layout: 'layouts/navbar'
    }); // Redireccionar al inicio de sesión si no está autenticado
  }
  else {
    // Verificar el rol del usuario
    const ID_Rol = req.session.ID_Rol;
    if (ID_Rol === 1){
      // Roles 1 (administrador) y 2 (comite) pueden acceder a la ruta '/usuarios'
      res.render('/', { 
        layout: 'layouts/navbar'
      });
    } 
    else {
      // Otros roles no tienen permiso para acceder a la ruta '/usuarios'
      res.status(403).send('Acceso denegado');
    }
  }
});
//Ruta para ingresar al registrar usuario
router.get('/register', (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.loggedin) {
    res.render('login/register', {
      layout: 'layouts/navbar'
    });
  }
  else {
    // Otros roles no tienen permiso para acceder a la ruta '/usuarios'
    res.status(403).send('No puedes registrar a nadie con una sesion iniciada');
  }
});
router.post('/auth', auth);
router.post('/RegisterUser', guardarNuevoUsuario);
router.get('/logout', logout);
//#endregion

//------------------------- Vistas solamente para ADMIN -------------------------

router.get('/usuarios', checkRole([1]), async (req, res) => {
  // Lógica de la ruta para el rol de administrador
  try{
    const usuarios = await getUsuarios(req);
    res.render('public/usuarios', { 
      layout: 'layouts/navbar',
      usuarios: usuarios,
      session: req.session.loggedin,
      rolsesion1: 1 === req.session.user['ID_Rol'],
      rolsesion2: 2 === req.session.user['ID_Rol'],
      rolsesion3: 3 === req.session.user['ID_Rol'],
      rolsesion4: 4 === req.session.user['ID_Rol'],
    });
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.get('/solicitudes', checkRole([1]), async (req, res) => {
  // Lógica de la ruta para el rol de administrador
  try{
    const solicitudes = await getSolicitudes(req);
    res.render('public/solicitudes', { 
      layout: 'layouts/navbar',
      solicitudes: solicitudes,
      session: req.session.loggedin,
      rolsesion1: 1 === req.session.user['ID_Rol'],
      rolsesion2: 2 === req.session.user['ID_Rol'],
      rolsesion3: 3 === req.session.user['ID_Rol'],
      rolsesion4: 4 === req.session.user['ID_Rol'],
    });
  }
  catch(err){
    res.status(500).send(err);
  }
});

//------------------------- Acciones de botones del ADMIN -------------------------

router.get('/EditarUsuario/:id', checkRole([1]) , EditUsuarios);//EDIT Usuario
router.get('/EliminarUsuario/:id', checkRole([1]), DeleteUsuario);//DELETE Usuario
router.post('/SaveEdit/:id', checkRole([1]), GuardarRol);//UPDATE Rol de Usuario

router.get('/EliminarSolicitud/:id', checkRole([1]), DeleteSolicitud);//DELETE Solicitud
router.get('/RevisarSolicitud/:id', checkRole([1]), RevisarSolicitud);//REVISAR Solicitud

//------------------------- Vistas de ADMIN y Directiva -------------------------

router.get('/dashboard', checkRole([1, 2, 3]), (req, res) => {
  res.render('public/dashboard', { 
    layout: 'layouts/navbar'
  });
});

//------------------------- Vistas de Alumno y ADMIN -------------------------

router.get('/nueva-solicitud', checkRole([1, 4]), async (req, res) => {
  // Lógica de la ruta para el rol de administrador
  const SolicitudList = await getSolicitudThisUser(req);
  res.render('public/nueva-solicitud', { 
    layout: 'layouts/navbar',
    session: req.session.loggedin,
    usuario: req.session.user,
    rolsesion1: 1 === req.session.user['ID_Rol'],
    rolsesion2: 2 === req.session.user['ID_Rol'],
    rolsesion3: 3 === req.session.user['ID_Rol'],
    rolsesion4: 4 === req.session.user['ID_Rol'],
    SolicitudList: SolicitudList
  });
});

router.post('/AddSolicitud', checkRole([1, 4]), SaveSolicited);

//------------------------- Vistas generales para personas logeadas -------------------------

router.get('/about', checkRole([1, 2, 3, 4, 5]), (req, res) => {
  // Lógica de la ruta para el rol de administrador
  res.render('public/about', { 
    layout: 'layouts/navbar',
    session: req.session.loggedin,
    rolsesion1: 1 === req.session.user['ID_Rol'],
    rolsesion2: 2 === req.session.user['ID_Rol'],
    rolsesion3: 3 === req.session.user['ID_Rol'],
    rolsesion4: 4 === req.session.user['ID_Rol'],
  });
});

module.exports = router;