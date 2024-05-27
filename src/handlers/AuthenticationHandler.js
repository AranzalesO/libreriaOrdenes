const IHandler = require('./IHandler');
const { Clerk } = require('@clerk/clerk-sdk-node');

class AuthenticationHandler extends IHandler {
  constructor(apiKey) {
    super();
    this.clerk = new Clerk({
      apiKey: apiKey
    });
  }

  async handle(request) {
    try {
      const user = await this.clerk.users.verifyPassword(request.username, request.password);
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

module.exports = AuthenticationHandler;
