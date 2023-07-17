const { connection } = require('../conn');// Asegúrate de tener el módulo de conexión a la base de datos configurado correctamente

function obtenerCantidadSolicitudes() {
    const queryEspera = "SELECT COUNT(*) AS cantidad FROM solicitud WHERE ID_Estado = 3";
    const queryAceptadas = "SELECT COUNT(*) AS cantidad FROM solicitud WHERE ID_Estado = 1";
    const queryRechazadas = "SELECT COUNT(*) AS cantidad FROM solicitud WHERE ID_Estado = 2";
  
    const obtenerCantidad = (query) => {
      return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) {
            reject(error);
          } else {
            const cantidad = results[0].cantidad || 0;
            resolve(cantidad);
          }
        });
      });
    };
  
    return Promise.all([
      obtenerCantidad(queryEspera),
      obtenerCantidad(queryAceptadas),
      obtenerCantidad(queryRechazadas),
    ]).then(([cantidadEspera, cantidadAceptadas, cantidadRechazadas]) => {
      const objetoCantidad = {
        Espera: cantidadEspera,
        Aceptadas: cantidadAceptadas,
        Rechazadas: cantidadRechazadas,
        Total: cantidadEspera +  cantidadAceptadas + cantidadRechazadas,
      };
  
      return objetoCantidad;
    }).catch((error) => {
      console.error("Error al obtener la cantidad de solicitudes:", error);
      throw new Error("Error al obtener la cantidad de solicitudes");
    });
}

module.exports = {
    obtenerCantidadSolicitudes
};