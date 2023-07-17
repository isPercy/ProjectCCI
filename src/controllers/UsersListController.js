const { connection } = require('../conn');

//  controlador para traer Usuarios
function getUsuarios(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT uu.*, r.NomRol FROM usuariouniversidad uu JOIN rol r ON uu.ID_Rol = r.ID WHERE ID_Rol != 1';
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
            })
            .catch(error => {
                res.send('Error al cargar roles');
            });
        }
    });
};

//  Funcion para cargar datos de rol en SelectBox
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

//  Funcion para Guardar el nuevo rol del usuario
function GuardarRol(req, res) {

    const userId = req.params.id;
    const rolId = req.body.role;
    if(rolId == 0){
        res.send('No se ha seleccionado ningún rol. Intente nuevamente.');
    }
    else{
    // Realizar la consulta SQL para actualizar el rol del usuario
        const query = `UPDATE usuariouniversidad SET ID_Rol = ${rolId} WHERE ID = ${userId}`;
        connection.query(query, (error, results) => {
            if (error) {
                res.send('Error al cambiar el rol del usuario');
            }
            else {
                res.redirect('/usuarios');
            }
        });
    }
};

module.exports = {
    getUsuarios, DeleteUsuario, EditUsuarios, GuardarRol
};