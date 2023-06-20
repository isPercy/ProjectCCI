const { connection } = require('../conn');

//  controlador para traer Usuarios
function getUsuarios(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Usuario';
        connection.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
            // res.redirect(editarUsuario(results.data));
        }
        });
    });
}

//  Controlador Eliminar
const DeleteUsuario = (req, res) => {
    const id = req.params.id;
    // connection.query('DELETE FROM Solicitud WHERE ID = ?') (error, result) => {
    if (error){

    }
    else{
        res.redirect('/home');
    }
        
};

module.exports = {
    getUsuarios, DeleteUsuario
};