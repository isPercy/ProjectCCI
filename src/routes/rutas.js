const express = require('express');
const router = express.Router();
const { index, auth, logout, guardarNuevoUsuario } = require("../controllers/LoginController");
const { getSolicitudes, DeleteSolicitud, EditSolicitud } = require('../controllers/SolicitudesController');
const { getUsuarios, DeleteUsuario, EditUsuarios } = require('../controllers/UsersListController');

// const { checkRole } = require('../controllers/middleware');

// Controlador para la ruta raíz
router.get('/', (req, res) => {
  res.render('home', {
    layout: 'layouts/navbar'
  });
});

//Rutas de login
  router.get('/login', (req, res) => {
    res.render('login/login', {
      layout: 'layouts/navbar'
    });
  });

  router.get('/register', (req, res) => {
    res.render('login/register', {
      layout: 'layouts/navbar'
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
      layout: 'layouts/navbar2'
    });
  });

  //  RUTA DE ##########################
  router.get('/about', (req, res) => {
    res.render('public/about', { 
      layout: 'layouts/navbar2'
    });
  });

  //  RUTA DE ##########################
  router.get('/contact', (req, res) => {
    res.render('public/contact', { 
      layout: 'layouts/navbar2'
    });
  });

  //  RUTA DE VER usuarios
  router.get('/usuarios',  async (req, res) => {
    try {
      const usuarios = await getUsuarios(req.app.locals.connection);
      res.render('public/usuarios', {
        layout: 'layouts/navbar2',
        usuarios: usuarios
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo usuarios');
    }
  });

  //  RUTA DE nueva-solicitud
  router.get('/nueva-solicitud', (req, res) => {
    res.render('public/nueva-solicitud', { 
      layout: 'layouts/navbar2'
    });
  });

  //  RUTA DE VERS solicitudes
  router.get('/solicitudes', async (req, res) => {
    try {
      const solicitudes = await getSolicitudes(req.app.locals.connection);
      res.render('public/solicitudes', {
        layout: 'layouts/navbar2',
        solicitudes: solicitudes
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
  router.get('/EditarUsuario/:id', guardarNuevoUsuario);

//#endregion

module.exports = router;