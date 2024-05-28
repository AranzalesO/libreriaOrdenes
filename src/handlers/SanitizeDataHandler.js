import IHandler from './IHandler.js';
import sanitizer from 'sanitizer';
const { sanitize } = sanitizer;

class SanitizeDataHandler extends IHandler {
  handle(request) {
    request.username = this.sanitizeInput(request.username);
    request.password = this.sanitizeInput(request.password);
    request.data = this.sanitizeInput(request.data);
    request.ipAddress = this.sanitizeInput(request.ipAddress);
    
    return request;
  }

  sanitizeInput(input) {
    if (typeof input === 'string') {
      let cleanInput = sanitize(input);
      cleanInput = cleanInput.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
      cleanInput = cleanInput.trim(); // Remove leading and trailing whitespace
      return cleanInput;
    }
    return input;
  }
}

export default SanitizeDataHandler;
