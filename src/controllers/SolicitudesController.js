const { connection } = require('../conn');

//  Controlador traer solicitud
const getSolicitudes = (conn) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT s.ID AS ID, uu.Nombre AS Nombre, s.Descripcion, o.Nombre_Organizacion AS Nombre_Organizacion, ro.Nombre_Representante AS Nombre_Representante FROM solicitud s JOIN usuariouniversidad uu ON s.ID_UsuarioUniversidad = uu.ID JOIN organizacionre_representanteorganizacion orro ON s.ID_OrganizacionyRepresentante = orro.ID JOIN organizacion o ON orro.ID_Organizacion = o.ID JOIN representante_organizacion ro ON orro.ID_Representante = ro.ID';
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Funcion Eliminar
const DeleteSolicitud = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM Solicitud WHERE ID = ?', id, (error, result) => {
        if (error) {
            res.send('Solicitud fallida');
        }
        else { 
            res.redirect('/solicitudes');
        }
    });
};

const EditSolicitud = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM Solicitud WHERE ID = ?', id, (error, result) => {
        if (error){
            res.send('error al cargar la vista de editar solicitud');
        }
        else {
            console.log(result);
        }
    });
};

module.exports = {
    getSolicitudes, DeleteSolicitud, EditSolicitud
};