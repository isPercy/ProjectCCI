// const { render } = require('ejs');

// index page
function index(req, res) {
  if (req.session.loggedin != true) {
    res.redirect('/');
  } else {
    res.render('/contact');
  }
}

function register(req, res) {
  //Query de create new usuariouniversidad
}

//Funcion de autenticacion de usuario
function auth(req, res) {
	const email = req.body.correo;
	const password = req.body.password;
  const query = 'SELECT * FROM usuariouniversidad WHERE Correo = ? AND Contrasenia = ?';
  try {
    req.getConnection((err, conn) => {
      conn.query(query, [email, password],(err, rows) => {
        if(rows.length > 0) {
          console.log(rows);
          res.redirect('/solicitudes');
        } else {
          console.log('Cuenta no encontrada');
          res.send('El correo y/o la contraseña no coincide con un usuario existente');
        }
      });
    });
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    //Manejar el error, enviar una respuesta de error al cliente, etc.
  }
}

//Funcion para cerrar sesion (destuir sesion)
function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}

module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
}