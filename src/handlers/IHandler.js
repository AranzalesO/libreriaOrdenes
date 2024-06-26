// Define la clase base abstracta IHandler
class IHandler {
  /**
   * Método handle que debe ser sobreescrito por las clases derivadas.
   * @param {Request} request - La solicitud a ser manejada.
   * @throws {Error} - Lanza un error indicando que el método debe ser sobreescrito.
   */
  handle(request) {
    // Lanza un error indicando que este método debe ser implementado por clases derivadas
    throw new Error("This method should be overridden!");
  }
}

// Exporta la clase IHandler como el valor por defecto del módulo
export default IHandler;
