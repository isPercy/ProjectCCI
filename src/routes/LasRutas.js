function checkRole(roles) {
    return (req, res, next) => {
        const rolUsuario = req.session.rol;

        if (roles.includes(rolUsuario)) {
        next();
        } else {
        res.status(403).send('Acceso denegado');
        }
    };
}
  
// Ruta protegida por rol
app.get('/admin', checkRole(['administrador']), (req, res) => {
    // Lógica de la ruta para el rol de administrador
});

app.get('/comite', checkRole(['comite']), (req, res) => {
    // Lógica de la ruta para el rol de comité
});

app.get('/profesor', checkRole(['profesor']), (req, res) => {
    // Lógica de la ruta para el rol de profesor
});

app.get('/alumno', checkRole(['alumno']), (req, res) => {
    // Lógica de la ruta para el rol de alumno
});

// Otra ruta para usuarios desconocidos (sin rol asignado)
app.get('/desconocido', checkRole(['desconocido']), (req, res) => {
    // Lógica de la ruta para usuarios desconocidos
});