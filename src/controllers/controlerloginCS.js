
//create autentification for users
function auth ()
{
    const email = req.body.email;
    const password = req.body.password
    const query = 'SELECT * usuariouniversidad WHERE Correo = ? AND contrasenia = ?'
    try{
        req.getConnection((error, conn))
    }
    catch(error){
        console.log(error)
    }
}