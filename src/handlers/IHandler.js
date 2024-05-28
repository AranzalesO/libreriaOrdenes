class IHandler {
    handle(request) {
      throw new Error("This method should be overridden!");
    }
  }
  
  export default IHandler;
  