const { connection } = require('../conn');

//  controlador para traer Usuarios
function getUsuarios(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuariouniversidad JOIN rol ON usuariouniversidad.ID_Rol = rol.ID WHERE usuariouniversidad.ID_Rol != 1';
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

//  Controlador Eliminar
function DeleteUsuario(req, res){
    const id = req.params.id;
    connection.query('DELETE FROM usuariouniversidad WHERE ID = ?', [id], (error) => {
        if (error) {
            res.send('Solicitud de "eliminar" fallida');
        }
        else {
            res.redirect('/usuarios');
        }
    });
};

//  Controlador entrar a editar usuarios
function EditUsuarios(req, res) {
    const id = req.params.id;
    const query = 'SELECT * FROM usuariouniversidad where ID = ?';
    connection.query(query, [id], (error, user) => {
      if (error) {
        res.send('Error al cargar datos de usuarios');
      } else {
        // Realizar la promesa para cargar los roles
        CargarRoles()
            .then(roles => {
                res.render('public/FormularioEditar', {
                    layout: 'layouts/navbar',
                    session: req.session.loggedin,
                    rolsesion1: 1 === req.session.user['ID_Rol'],
                    rolsesion2: 2 === req.session.user['ID_Rol'],
                    rolsesion3: 3 === req.session.user['ID_Rol'],
                    rolsesion4: 4 === req.session.user['ID_Rol'],
                    OpcionRoles: roles,
                    usuario: user[0]
                });
                console.log(id);
            })
            .catch(error => {
                res.send('Error al cargar roles');
            });
        }
    });
}

function CargarRoles() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM rol';
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getUsuarios, DeleteUsuario, EditUsuarios
};