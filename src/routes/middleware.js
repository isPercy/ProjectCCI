function checkRole(roles) {
    return (req, res, next) => {
      const rolUsuario = req.session.user.ID_Rol;
      
      if (roles.includes(rolUsuario)) {
        next();
      }
      else {
        res.status(403).send('Acceso denegado');
      }
      
    };
  }

  module.exports = { checkRole };