class Request {
    constructor(username, password, data, ipAddress) {
      this.username = username;
      this.password = password;
      this.data = data;
      this.ipAddress = ipAddress;
    }
  }
  
  module.exports = Request;
  