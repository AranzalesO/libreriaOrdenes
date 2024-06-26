// Importa la clase base IHandler
import IHandler from './IHandler.js';

// Define la clase BruteForceFilterHandler que extiende de IHandler
class BruteForceFilterHandler extends IHandler {
  /**
   * Constructor de la clase BruteForceFilterHandler.
   * Inicializa un objeto para rastrear los intentos fallidos por IP.
   */
  constructor() {
    super(); // Llama al constructor de la clase base IHandler
    this.failedAttempts = {}; // Objeto para almacenar los intentos fallidos por IP
  }

  /**
   * Maneja la solicitud verificando intentos fallidos desde la misma IP.
   * @param {Request} request - La solicitud a ser manejada.
   * @returns {Request} - La solicitud si no se han excedido los intentos fallidos.
   * @throws {Error} - Si se han excedido los intentos fallidos desde la misma IP.
   */
  handle(request) {
    const ip = request.ipAddress; // Obtiene la dirección IP de la solicitud

    // Inicializa el contador de intentos fallidos para la IP si no existe
    if (!this.failedAttempts[ip]) {
      this.failedAttempts[ip] = 0;
    }

    // Lanza un error si la IP ha excedido el número permitido de intentos fallidos
    if (this.failedAttempts[ip] > 5) {
      throw new Error('Too many failed attempts from this IP');
    }

    try {
      return request; // Retorna la solicitud si todo es correcto
    } catch (error) {
      // Incrementa el contador de intentos fallidos en caso de error
      this.failedAttempts[ip]++;
      throw error; // Lanza el error capturado
    }
  }
}

// Exporta la clase BruteForceFilterHandler como el valor por defecto del módulo
export default BruteForceFilterHandler;
