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
                ID_Roll: result[0].ID_Roll
            });
        }
    });
};

module.exports = {
    getUsuarios, DeleteUsuario, EditUsuarios
};