class IHandler {
    handle(request) {
      throw new Error("This method should be overridden!");
    }
  }
  
  module.exports = IHandler;
  