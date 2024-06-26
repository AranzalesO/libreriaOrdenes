// Importa la clase base IHandler
import IHandler from './IHandler.js';
// Importa todas las exportaciones del módulo @clerk/clerk-sdk-node como Clerk
import * as Clerk from '@clerk/clerk-sdk-node';

// Define la clase AuthenticationHandler que extiende de IHandler
class AuthenticationHandler extends IHandler {
  /**
   * Constructor de la clase AuthenticationHandler.
   * @param {string} apiKey - La clave API para Clerk.
   */
  constructor(apiKey) {
    super(); // Llama al constructor de la clase base IHandler
    this.apiKey = apiKey; // Asigna la clave API a la instancia

    // Configura la clave API globalmente para Clerk
    process.env.CLERK_API_KEY = apiKey;
  }

  /**
   * Maneja la solicitud de autenticación.
   * @param {Request} request - La solicitud a ser manejada.
   * @returns {Promise<Request>} - La solicitud procesada con el usuario autenticado.
   */
  async handle(request) {
    try {
      // Verifica las credenciales del usuario usando Clerk
      const user = await Clerk.users.verifyPassword(request.username, request.password);
      
      // Si el usuario no es válido, lanza un error de autenticación
      if (!user) {
        throw new Error('Authentication failed');
      }

      // Asigna el usuario autenticado a la solicitud
      request.user = user;
      
      // Retorna la solicitud procesada
      return request;
    } catch (error) {
      // Lanza un error en caso de falla en la autenticación
      throw new Error('Authentication failed');
    }
  }
}

// Exporta la clase AuthenticationHandler como el valor por defecto del módulo
export default AuthenticationHandler;
