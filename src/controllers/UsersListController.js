const { connection } = require('../conn');

//  controlador para traer Usuarios
const getUsuarios = (conn) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuariouniversidad';
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
    connection.query('DELETE FROM usuariouniversidad WHERE ID = ?', id, (error, result) => {
        if (error) { 
            res.redirect('/usuarios');
            res.send('Solicitud fallida');
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
            res.send('error al cargar la vista de editar solicitud');
        }
        else {
            console.log(result);
            res.render('public/FormularioEditar', {
                layout: 'layouts/navbar2',
                Nombre: result[0].Nombre,
                Rut: result[0].Rut,
                Correo: result[0].Correo,
                ID_Roll: result[0].ID_Roll,
              });
        }
    });
};

module.exports = {
    getUsuarios, DeleteUsuario, EditUsuarios
};