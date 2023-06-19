// Importar la función connection
const { connection } = require('../conn');

//  Query para traer solicitud
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
const getEliminar = (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM Solicitud WHERE ID = ?', id, (error, result) => {
        if (error) throw error;
        res.redirect('/home');
    });
};

// Funcion Editar
const getVistaEditar = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM solicitud WHERE ID = ?';
    try {
        req.getConnection((err, conn) => {
            conn.query(query, [id],(err, rows) => {
                if(rows.length > 0) {
                    console.log(rows);
                    res.redirect('/FormularioEditar');

                    


                } else {
                    console.log('Usuario no encontrado');
                    res.send('usuario no existente');
                }
            });
        });
    }
    catch (error) {
        console.error('Error al ejecutar la consulta:', error);
    }
    // connection.query('UPDATE usuario_universidad SET ? WHERE id = ?', [datosActualizados, id], (error, result) => {
    //     if (error) throw error;
    //     res.send('/solicitudes');
    // });
};

module.exports = {
    getSolicitudes, getVistaEditar, getEliminar 
};