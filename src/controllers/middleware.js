// // middleware.js
// function checkRole(role) {
//     return function (req, res, next) {
//       // Verificar si el rol del usuario autenticado coincide con el rol requerido
//       if (req.session && req.session.role === role) {
//         return next();
//       } else {
//         return res.redirect('/'); // Redireccionar a una página de acceso no autorizado
//       }
//     };
//   }
  
//   module.exports = {
//     checkRole: checkRole
//   };