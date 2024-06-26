// Definición de la clase HandlesChain
class HandlesChain {
  /**
   * Constructor de la clase HandlesChain.
   * Inicializa un arreglo vacío para almacenar los manejadores.
   */
  constructor() {
    this.handlers = []; // Arreglo para almacenar los manejadores
  }

  /**
   * Añade un manejador a la cadena de manejadores.
   * @param {IHandler} handler - El manejador a añadir.
   */
  addHandler(handler) {
    // Verificar que el argumento 'handler' es una instancia de IHandler
    if (handler instanceof IHandler) {
      this.handlers.push(handler); // Añadir el manejador al arreglo
    } else {
      throw new TypeError('Handler must be an instance of IHandler'); // Lanzar error si no es válido
    }
  }

  /**
   * Maneja la solicitud pasando la misma a través de todos los manejadores en la cadena.
   * @param {Request} request - La solicitud a ser manejada.
   * @returns {Promise<Request>} - La solicitud procesada.
   */
  async handle(request) {
    // Validar que la solicitud es un objeto y no es nulo
    if (typeof request !== 'object' || request === null) {
      throw new TypeError('Request must be a valid object'); // Lanzar error si la solicitud no es válida
    }

    // Procesar la solicitud a través de cada manejador en la cadena
    for (let handler of this.handlers) {
      request = await handler.handle(request); // Pasar la solicitud al siguiente manejador
    }
    
    // Retornar la solicitud procesada
    return request;
  }
}

export default HandlesChain; // Exportar la clase HandlesChain como el valor por defecto del módulo
