const { connection } = require('../conn');

//  controlador para traer Usuarios
const getUsuarios = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuariouniversidad WHERE ID_Rol != 1';
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

const EditUsuarios = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM usuariouniversidad WHERE ID = ?', id, (error, result) => {
        if (error) {
            res.send('Error al cargar datos de usuarios');
        }
        else {
            res.render('public/FormularioEditar', {
                layout: 'layouts/navbar',
                session: req.session.loggedin,
                Nombre: result[0].Nombre,
                Rut: result[0].Rut,
                Correo: result[0].Correo,
                ID_Roll: result[0].ID_Roll,
                rolsesion1: 1 === req.session.user['ID_Rol'],
                rolsesion2: 2 === req.session.user['ID_Rol'],
                rolsesion3: 3 === req.session.user['ID_Rol'],
                rolsesion4: 4 === req.session.user['ID_Rol'],
            });
        }
    });
};

// const RolesUsuario = (req , res) => {
//     connection.query('SELECT * FROM rol', (err, rows) => {
//         if (err) {
//             console.error('Error al cargar roles: ', err);
//             res.status(500).send('Error Al Obtener Roles');
//             return
//         }
//     }); 
// }

module.exports = {
    getUsuarios, DeleteUsuario, EditUsuarios
};