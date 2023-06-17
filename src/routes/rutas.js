const express = require('express');
const router = express.Router();
const { getSolicitudes , getEliminar, getEditar } = require('../controllers/ControllerUsers');
const { index, auth, logout } = require("../controllers/LoginController");


//Rutas de login
router.get('/index', index);
router.post('/auth', auth);
router.get('/logout', logout);

//#region Inicio sin logear

  // Controlador para la ruta raíz
  router.get('/', (req, res) => {
    res.render('home', {
      layout: 'layouts/navbar',
      activeHome: true
    });
  });
  //  Controlador para la ruta Login
  router.get('/login', (req, res) => {
    res.render('public/login', { 
      layout: 'layouts/navbar',
    });
  });
  //  Controlador para la ruta Register
  router.get('/register', (req, res) => {
    res.render('public/register', { 
      layout: 'layouts/navbar',
    });
  });

//#endregion


//#region Rutas de control admin
  //  Controlador para la ruta Servicios
  router.get('/FormularioEditar', (req, res) => {
    res.render('public/FormularioEditar', { 
      layout: 'layouts/navbar',
      activeServices: true
    });
  });

  //  Controlador para la ruta Sobre nosotros
  router.get('/about', (req, res) => {
    res.render('public/about', { 
      layout: 'layouts/navbar', 
      activeAbout: true
    });
  });

  //  Controlador para la ruta Contacto
  router.get('/contact', (req, res) => {
    res.render('public/contact', { 
      layout: 'layouts/navbar',
      activeContact: true
    });
  });

  //  Controlador para la ruta Usuarios
  router.get('/solicitudes', async (req, res) => {
    try {
      const usuarios = await getSolicitudes(req.app.locals.connection);
      res.render('public/solicitudes', {
        layout: 'layouts/navbar', 
        activeUser: true,
        usuarios: usuarios,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo usuarios');
    }
  });

  // Controlador para la ruta eliminar
  router.get('/eliminar/:id' , getEliminar)

  // Controlador para la ruta editar
  router.get('/editar/' , getEditar)
//#endregion

module.exports = router;