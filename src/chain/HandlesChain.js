class HandlesChain {
    constructor() {
      this.handlers = [];
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    async handle(request) {
      for (let handler of this.handlers) {
        request = await handler.handle(request);
      }
      return request;
    }
  }
  
  module.exports = HandlesChain;
  