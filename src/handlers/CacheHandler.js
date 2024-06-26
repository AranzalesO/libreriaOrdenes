// Importa la clase base IHandler
import IHandler from './IHandler.js';
// Importa la librería node-cache
import NodeCache from 'node-cache';

// Crea una instancia de NodeCache
const cache = new NodeCache();

// Define la clase CacheHandler que extiende de IHandler
class CacheHandler extends IHandler {
  /**
   * Maneja la solicitud utilizando una caché para mejorar el rendimiento.
   * @param {Request} request - La solicitud a ser manejada.
   * @returns {Promise<Request>} - La solicitud procesada o datos en caché.
   * @throws {Error} - Si ocurre un error con la caché.
   */
  async handle(request) {
    // Genera una clave única para la caché basada en el nombre de usuario y los datos de la solicitud
    const key = `${request.username}-${request.data}`;

    try {
      // Intenta obtener los datos en caché usando la clave generada
      const cachedData = cache.get(key);
      
      // Si los datos están en la caché, los retorna
      if (cachedData) {
        return cachedData;
      } else {
        // Si no están en la caché, guarda la solicitud en la caché por 1 hora (3600 segundos)
        cache.set(key, request, 3600);
        return request; // Retorna la solicitud
      }
    } catch (err) {
      // Lanza un error si ocurre un problema con la caché
      throw new Error('Cache error');
    }
  }
}

// Exporta la clase CacheHandler como el valor por defecto del módulo
export default CacheHandler;
