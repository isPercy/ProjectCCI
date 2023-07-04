function checkRole(roles) {
    return (req, res, next) => {
      const rolUsuario = req.session.user.ID_Rol;
  
      if (rolUsuario === 1 || rolUsuario === 2 || rolUsuario === 3 || rolUsuario === 4 || rolUsuario === 5 && roles.includes(rolUsuario)) {
        next();
      }
      else {
        res.status(403).send('Acceso denegado');
      }
    };
  }

  module.exports = { checkRole };