const mysql = require('mysql');

    //  Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'team_z',
});
          //  Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos: ', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = {
    connection: connection
};