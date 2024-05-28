import IHandler from './IHandler.js';
import { clients, users } from '@clerk/clerk-sdk-node';

class AuthenticationHandler extends IHandler {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    clients.setApiKey(apiKey);
  }

  async handle(request) {
    try {
      const user = await users.verifyPassword(request.username, request.password);
      if (!user) {
        throw new Error('Authentication failed');
      }
      request.user = user;
      return request;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }
}

export default AuthenticationHandler;