const { connection } = require('../conn');

//  controlador para traer Usuarios
const getUsuarios = () => {
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
const DeleteUsuario = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuariouniversidad WHERE ID = ?', id, (error) => {
        if (error) { 
            res.send('Solicitud de "eliminar" fallida');
        }
        else { 
            res.redirect('/usuarios');
        }
    });
};

//  Controlador entrar a editar usuarios
const EditUsuarios = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM usuariouniversidad WHERE ID = ?', id, (error, user) => {
        if (error) {
            res.send('Error al cargar datos de usuarios');
        }
        else {
            res.render('public/FormularioEditar', {
                layout: 'layouts/navbar',
                session: req.session.loggedin,
                Nombre: user.Nombre,
                Rut: user.Rut,
                Correo: user.Correo,
                ID_Roll: user.ID_Roll,
                rolsesion1: 1 === req.session.user['ID_Rol'],
                rolsesion2: 2 === req.session.user['ID_Rol'],
                rolsesion3: 3 === req.session.user['ID_Rol'],
                rolsesion4: 4 === req.session.user['ID_Rol'],
            });
        }
    });
};

module.exports = {
    getUsuarios, DeleteUsuario, EditUsuarios
};