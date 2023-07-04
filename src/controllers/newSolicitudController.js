const { connection } = require('../conn');

const SaveSolicited = (req, res) => {
    const organizacion = req.body.organizacion;
    const nomrep = req.body.representante;
    const correo = req.body.CorreoCliente;
    const desc = req.body.descripcion;
    const id = req.session.user['ID'];
    const query = 'INSERT INTO Solicitud (Descripcion, ID_UsuarioUniversidad,ID_OrganizacionyRepresentante) VALUES (?, ?, ?)';
    if(organizacion != '' && nomrep != '' && correo != '' && desc != '') {
        try{
            req.getConnection((err, conn) => {
                conn.query(query, [desc, id, 1], (err, rows) => {
                    if (err) {
                        console.error('Error al guardar el usuario:', err);
                        res.status(500).send('Error al guardar el usuario');
                    }
                    else {
                        console.log(rows);
                        res.redirect('/nueva-solicitud');
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        console.send('Error, no se permiten espacios vacios');
    }
};

const getSolicitudThisUser = (conn) => {
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

module.exports = {
    SaveSolicited, getSolicitudThisUser
};