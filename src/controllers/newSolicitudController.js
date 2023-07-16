const { connection } = require('../conn');

//  Funcion para guardar solicitud de practica.
function SaveSolicited(req, res) {
    const organizacion = req.body.Organizacion;
    const rutCliente = req.body.RutCliente;
    const representante = req.body.Representante;
    const correoCliente = req.body.CorreoCliente;
    const descripcion = req.body.Descripcion;
    const userId = req.session.user["ID"];
    const estadoId = 3;
    console.log(descripcion);
    // const query = 'INSERT INTO Solicitud (Descripcion, ID_UsuarioUniversidad,ID_OrganizacionyRepresentante) VALUES (?, ?, ?)';
   
    const queryOrganizacion = `INSERT INTO organizacion (Nombre_Organizacion) VALUES (?)`;
    connection.query(queryOrganizacion, [organizacion], (error, results) => {
    if (error) throw error;

    const organizacionId = results.insertId;

    // Inserta los datos en la tabla "representante_organizacion"
    const queryRepresentante = `INSERT INTO representante_organizacion (Rut, Nombre_Representante, Correo) VALUES (?, ?, ?)`;
    connection.query(queryRepresentante, [rutCliente, representante, correoCliente], (error, results) => {
        if (error) throw error;

        const representanteId = results.insertId;

        // Inserta los datos en la tabla "organizacion_representanteorganizacion"
        const queryRelacion = `INSERT INTO organizacion_representanteorganizacion (ID_Representante, ID_Organizacion) VALUES (?, ?)`;
        connection.query(queryRelacion, [representanteId, organizacionId], (error, results) => {
            if (error) throw error;

            const relacionId = results.insertId;

            // Inserta los datos en la tabla "solicitud"
            const querySolicitud = `INSERT INTO solicitud (Descripcion, ID_UsuarioUniversidad, ID_Estado, ID_OrganizacionyRepresentante) VALUES (?, ?, ?, ?)`;
            connection.query(querySolicitud, [descripcion, userId, estadoId, relacionId], (error, results) => {
            if (error) throw error;

                // Realiza alguna acción adicional, como redireccionar a otra página
                res.redirect('/nueva-solicitud');
            });
        });
    });
  });

};

//  Funcion para cargar tabla de solicitudes del usuario logeado.
function getSolicitudThisUser(req) {
    return new Promise((resolve, reject) => {
        const user_id = req.session.user['ID'];
        // const query = `SELECT s.ID AS ID, uu.Nombre AS Nombre, s.Descripcion, o.Nombre_Organizacion AS Nombre_Organizacion, ro.Nombre_Representante AS Nombre_Representante FROM solicitud s JOIN usuariouniversidad uu ON s.ID_UsuarioUniversidad = uu.ID JOIN organizacion_representanteorganizacion orro ON s.ID_OrganizacionyRepresentante = orro.ID JOIN organizacion o ON orro.ID_Organizacion = o.ID JOIN representante_organizacion ro ON orro.ID_Representante = ro.ID WHERE uu.ID = ${user_id}`;
        const query2 = `SELECT s.ID AS ID, uu.Nombre AS Nombre, s.Descripcion, o.Nombre_Organizacion AS Nombre_Organizacion, ro.Nombre_Representante AS Nombre_Representante, e.Nombre_Estado AS Nombre_Estado
        FROM solicitud s
        JOIN usuariouniversidad uu ON s.ID_UsuarioUniversidad = uu.ID
        JOIN organizacion_representanteorganizacion orro ON s.ID_OrganizacionyRepresentante = orro.ID
        JOIN organizacion o ON orro.ID_Organizacion = o.ID
        JOIN representante_organizacion ro ON orro.ID_Representante = ro.ID
        JOIN estado e ON s.ID_Estado = e.ID
        WHERE uu.ID = ${user_id}`;
        connection.query(query2, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
            // console.log(results);
        });
    });
}

module.exports = {
    SaveSolicited, getSolicitudThisUser
};