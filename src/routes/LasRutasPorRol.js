const express = require('express');
const router = express.Router();
const { auth, logout, guardarNuevoUsuario } = require("../controllers/LoginController");
const { getSolicitudes, DeleteSolicitud, EditSolicitud } = require('../controllers/SolicitudesController');
const { getUsuarios, DeleteUsuario, EditUsuarios } = require('../controllers/UsersListController');

// Ruta por defecto para el ingreso global
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

// Ruta protegida por autenticación y restricción de roles
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
    if (ID_Rol === 1 || ID_Rol === 2) {
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

router.get('/register', (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.loggedin) {
    res.render('login/register', {
      layout: 'layouts/navbar'
    }); // Redireccionar al inicio de sesión si no está autenticado
  }
  else {
    // Verificar el rol del usuario
    const ID_Rol = req.session.ID_Rol;
    if (ID_Rol === 1 || ID_Rol === 2) {
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

router.post('/auth', auth);
router.post('/RegisterUser', guardarNuevoUsuario);
router.get('/logout', logout);


//#region ----- FUNCION PARA VALIDAR ROLES.
function checkRole(roles) {
  return (req, res, next) => {
    const rolUsuario = req.session.user.ID_Rol;

    if (rolUsuario === 1 && roles.includes(rolUsuario)) {
      next();
    } else {
      res.status(403).send('Acceso denegado');
    }
  };
}
//#endregion



// Resto de las rutas protegidas solo para el rol de administrador (ID_Rol = 1)
router.get('/usuarios', checkRole([1]), async (req, res) => {
  // Lógica de la ruta para el rol de administrador
  try{
    const usuarios = await getUsuarios(req.app.locals.connection);
    res.render('public/usuarios', { 
      layout: 'layouts/navbar',
      usuarios: usuarios,
      session: req.session.loggedin
    });
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.get('/solicitudes', checkRole([1]), async (req, res) => {
  // Lógica de la ruta para el rol de administrador
  try{
    const solicitudes = await getUsuarios(req.app.locals.connection);
    res.render('public/solicitudes', { 
      layout: 'layouts/navbar',
      solicitudes: solicitudes,
      session: req.session.loggedin
    });
  }
  catch(err){
    res.status(500).send(err);
  }
});

router.get('/EditarUsuario/:id', checkRole([1]) , EditUsuarios);
router.get('/EliminarUsuario/:id', checkRole([1]), DeleteUsuario);

router.get('/about', checkRole([1] || [5]), (req, res) => {
  // Lógica de la ruta para el rol de administrador
  res.render('public/about', { 
    layout: 'layouts/navbar',
    session: req.session.loggedin
  });
});


module.exports = router;