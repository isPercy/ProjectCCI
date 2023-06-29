function checkRole(roles) {
  return (req, res, next) => {
    const rolUsuario = req.session.ID_Rol;

    if (rolUsuario === 1 && roles.includes(rolUsuario)) {
      next();
    } else {
      res.status(403).send('Acceso denegado');
    }
  };
}

// Resto de las rutas protegidas solo para el rol de administrador (ID_Rol = 1)
app.get('/admin', checkRole([1]), (req, res) => {
  
});

app.get('/comite', checkRole([1]), (req, res) => {
  // Lógica de la ruta para el rol de comité
});

app.get('/profesor', checkRole([1]), (req, res) => {
  // Lógica de la ruta para el rol de profesor
});

app.get('/alumno', checkRole([1]), (req, res) => {
  // Lógica de la ruta para el rol de alumno
});

app.get('/desconocido', checkRole([1]), (req, res) => {
  // Lógica de la ruta para usuarios desconocidos
});
