import IHandler from './IHandler';

class BruteForceFilterHandler extends IHandler {
  constructor() {
    super();
    this.failedAttempts = {};
  }

  handle(request) {
    const ip = request.ipAddress;
    if (!this.failedAttempts[ip]) {
      this.failedAttempts[ip] = 0;
    }

    if (this.failedAttempts[ip] > 5) {
      throw new Error('Too many failed attempts from this IP');
    }

    try {
      return request;
    } catch (error) {
      this.failedAttempts[ip]++;
      throw error;
    }
  }
}

export default BruteForceFilterHandler;
