// Controlador para guardar un registro de usuario nuevo
function guardarNuevoUsuario (req, res) {
  //#region variables
  const rut = req.body.rut;
  const nombre = req.body.nombre;
  const contraseña = req.body.contrasenia;
  const correo = req.body.correo;
  const rol = 5;
  //#endregion
  const query = 'INSERT INTO usuariouniversidad (Rut, Nombre, Contrasenia, Correo, ID_Rol) VALUES (?, ?, ?, ?, ?)';
  try{
    req.getConnection((err, conn) => {
      conn.query(query, [rut, nombre, contraseña, correo, rol],(err, rows) => {
      if (err) {
        console.error('Error al guardar el usuario:', err);
        res.status(500).send('Error al guardar el usuario');
      }
      else {
        console.log(rows);
        res.redirect('/login');
      }
      });
    });
  }
  catch (error) {
    // console.error('Error al guardar el usuario:', error);
    res.status(500).send('Error al guardar el usuario');
  }
};

//Funcion de autenticacion de usuario
function auth(req, res) {
  //#region variables
	const email = req.body.correo;
	const password = req.body.password;
  //#endregion
  const query = 'SELECT * FROM usuariouniversidad WHERE Correo = ? AND Contrasenia = ?';
  try {
    req.getConnection((err, conn) => {
      conn.query(query, [email, password], (err, user) => {
        if (user.length > 0) {
          req.session.loggedin = true;
          req.session.user = user[0];
          console.log(req.session.loggedin);
          res.redirect('/usuarios');
        } else {
          res.render('login/login', {
            layout: 'layouts/navbar',
            error: 'El correo y/o la contraseña no coincide con un usuario existente',
          });
        }
      });
    });
  } catch (error) {
    // ...
  }
};

//Funcion para cerrar sesion (destuir sesion)
function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}

module.exports = {
  //index: index,
  auth: auth,
  logout: logout,
  guardarNuevoUsuario: guardarNuevoUsuario,
};