const express = require('express');
const router = express.Router();
const { index, auth, logout, guardarNuevoUsuario } = require("../controllers/LoginController");
const { getSolicitudes, DeleteSolicitud, EditSolicitudes } = require('../controllers/SolicitudesController');
const { getUsuarios, DeleteUsuario } = require('../controllers/UsersListController');

// const { checkRole } = require('../controllers/middleware');

// Controlador para la ruta raíz
router.get('/', (req, res) => {
  res.render('/home', {
    layout: 'layouts/navbar',
    activeHome: true
  });
});

//Rutas de login
  router.get('/login', (req, res) => {
    res.render('login/login', {
      layout: 'layouts/navbar',
    });
  });

  router.get('/register', (req, res) => {
    res.render('login/register', {
      layout: 'layouts/navbar',
    });
  });

  router.post('/auth', auth);
  router.post('/RegisterUser', guardarNuevoUsuario);
//#endregion

//------------------------------------

//#region Rutas de control admin

  //  RUTA DE FormularioEditar
  router.get('/FormularioEditar', (req, res) => {
    res.render('public/FormularioEditar', { 
      layout: 'layouts/navbar2',
      activeServices: true
    });
  });

  //  RUTA DE ##########################
  router.get('/about', (req, res) => {
    res.render('public/about', { 
      layout: 'layouts/navbar2', 
      activeAbout: true
    });
  });

  //  RUTA DE ##########################
  router.get('/contact', (req, res) => {
    res.render('public/contact', { 
      layout: 'layouts/navbar2', 
      activeAbout: true
    });
  });

  //  RUTA DE usuarios
  router.get('/usuarios', (req, res) => {
    res.render('public/usuarios', { 
      layout: 'layouts/navbar2',
      activeContact: true
    });
  });

  //  RUTA DE nueva-solicitud
  router.get('/nueva-solicitud', (req, res) => {
    res.render('public/nueva-solicitud', { 
      layout: 'layouts/navbar2'
    });
  });

  //  RUTA DE solicitudes
  router.get('/solicitudes', async (req, res) => {
    try {
      const usuarios = await getSolicitudes(req.app.locals.connection);
      res.render('public/solicitudes', {
        layout: 'layouts/navbar2', 
        activeUser: true,
        usuarios: usuarios,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo usuarios');
    }
  });

  // Controlador para la ruta eliminar
  router.get('/EliminarSolicitud/:id' , DeleteSolicitud)
  // Controlador para la ruta editar
  router.get('/EditarSolicitud/:id' , EditSolicitudes)
  
//#endregion

module.exports = router;