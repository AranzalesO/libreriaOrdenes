// Define la clase Request para representar una solicitud
class Request {
  /**
   * Constructor para crear una nueva instancia de Request.
   * @param {string} username - El nombre de usuario de la solicitud.
   * @param {string} password - La contraseña de la solicitud.
   * @param {any} data - Datos adicionales de la solicitud.
   * @param {string} ipAddress - La dirección IP desde donde se realiza la solicitud.
   */
  constructor(username, password, data, ipAddress) {
    // Asigna el nombre de usuario a la instancia de Request
    this.username = username;
    // Asigna la contraseña a la instancia de Request
    this.password = password;
    // Asigna los datos adicionales a la instancia de Request
    this.data = data;
    // Asigna la dirección IP a la instancia de Request
    this.ipAddress = ipAddress;
  }
}

// Exporta la clase Request como el valor por defecto del módulo
export default Request;
