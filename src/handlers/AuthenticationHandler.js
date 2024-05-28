import IHandler from './IHandler.js';
import * as Clerk from '@clerk/clerk-sdk-node';

class AuthenticationHandler extends IHandler {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    // Set the API key globally for Clerk
    process.env.CLERK_API_KEY = apiKey;
  }

  async handle(request) {
    try {
      const user = await Clerk.users.verifyPassword(request.username, request.password);
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