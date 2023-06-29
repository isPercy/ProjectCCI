const express = require('express');
const router = express.Router();
const { auth, logout, guardarNuevoUsuario } = require("../controllers/LoginController");
const { getSolicitudes, DeleteSolicitud, EditSolicitud } = require('../controllers/SolicitudesController');
const { getUsuarios, DeleteUsuario, EditUsuarios } = require('../controllers/UsersListController');

// Controlador para la ruta raíz
router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('home', {
      layout: 'layouts/navbar',
      session: req.session.loggedin,
      usuario: req.session.user['Nombre']+' ',
    });
  }
  else {
    res.render('home', {
      layout: 'layouts/navbar',
      session: req.session.loggedin
    });
  }
});

//Rutas de login
  router.get('/login', (req, res) => {
    res.render('login/login', {
      layout: 'layouts/navbar',
      session: req.session.loggedin     
    });
  });

  router.get('/register', (req, res) => {
    res.render('login/register', {
      layout: 'layouts/navbar',
      session: req.session.loggedin
    });
  });

  router.post('/auth', auth);
  router.post('/RegisterUser', guardarNuevoUsuario);
//#endregion

//------------------------------------

//#region Rutas de control admin

  //  RUTA DE FormularioEditar
  router.get('/FormularioEditar', (req, res) => {
    // const usuario = EditUsuarios(req.app.locals.connection);
    res.render('public/FormularioEditar', {
      layout: 'layouts/navbar',
      session: req.session.loggedin
    });
  });

  //  RUTA DE ##########################
  router.get('/about', (req, res) => {
    res.render('public/about', { 
      layout: 'layouts/navbar',
      session: req.session.loggedin
    });
  });

  //  RUTA DE ##########################
  router.get('/contact', (req, res) => {
    res.render('public/contact', { 
      layout: 'layouts/navbar',
      session: req.session.loggedin
    });
  });

  //  RUTA DE VER usuarios
  router.get('/usuarios',  async (req, res) => {
    try {
      const usuarios = await getUsuarios(req.app.locals.connection);
      res.render('public/usuarios', {
        layout: 'layouts/navbar',
        usuarios: usuarios,
        session: req.session.loggedin
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo usuarios');
    }
  });

  //  RUTA DE nueva-solicitud
  router.get('/nueva-solicitud', (req, res) => {
    res.render('public/nueva-solicitud', { 
      layout: 'layouts/navbar',
      sessionStar: req.session.loggedin
    });
  });


  
  //  RUTA DE VERS solicitudes
  router.get('/solicitudes', async (req, res) => {
    try {
      const solicitudes = await getSolicitudes(req.app.locals.connection);
      res.render('public/solicitudes', {
        layout: 'layouts/navbar',
        solicitudes: solicitudes,
        session: req.session.loggedin
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo solicitudes');
    }
  });

  // Controlador para eliminar solicitud
  router.get('/EliminarSolicitud/:id' , DeleteSolicitud);
  // Controlador para editar solicitud
  router.get('/EditarSolicitud/:id' , EditSolicitud);

  // Controlador para eliminar usuario
  router.get('/EliminarUsuario/:id', DeleteUsuario);
  // Controlador para editar usuario
  router.get('/EditarUsuario/:id', EditUsuarios);


  router.get('/logout', logout);

//#endregion

module.exports = router;