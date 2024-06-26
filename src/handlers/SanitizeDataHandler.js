// Importa la clase base IHandler
import IHandler from './IHandler.js';
// Importa la librería sanitizer
import sanitizer from 'sanitizer';

// Desestructura el método sanitize desde la librería sanitizer
const { sanitize } = sanitizer;

// Define la clase SanitizeDataHandler que extiende de IHandler
class SanitizeDataHandler extends IHandler {
  /**
   * Maneja la solicitud sanitizando los datos sensibles.
   * @param {Request} request - La solicitud a ser manejada.
   * @returns {Request} - La solicitud con los datos sanitizados.
   */
  handle(request) {
    // Sanitiza cada campo de la solicitud
    request.username = this.sanitizeInput(request.username);
    request.password = this.sanitizeInput(request.password);
    request.data = this.sanitizeInput(request.data);
    request.ipAddress = this.sanitizeInput(request.ipAddress);

    // Retorna la solicitud con los datos sanitizados
    return request;
  }

  /**
   * Sanitiza el input removiendo caracteres no deseados y espacios en blanco.
   * @param {string} input - El input a ser sanitizado.
   * @returns {string} - El input sanitizado.
   */
  sanitizeInput(input) {
    // Verifica si el input es una cadena de texto
    if (typeof input === 'string') {
      // Sanitiza el input removiendo caracteres potencialmente peligrosos
      let cleanInput = sanitize(input);
      // Remueve etiquetas HTML
      cleanInput = cleanInput.replace(/<[^>]*>?/gm, '');
      // Remueve espacios en blanco al inicio y al final
      cleanInput = cleanInput.trim();
      return cleanInput;
    }
    // Retorna el input original si no es una cadena de texto
    return input;
  }
}

// Exporta la clase SanitizeDataHandler como el valor por defecto del módulo
export default SanitizeDataHandler;
``
