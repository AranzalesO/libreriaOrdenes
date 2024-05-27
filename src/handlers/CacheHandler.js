import IHandler from './IHandler';
import { createClient } from 'redis';
const client = createClient();

class CacheHandler extends IHandler {
  constructor() {
    super();
    this.cache = new Map();
  }

  handle(request) {
    const key = `${request.username}-${request.data}`;
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) reject(err);
        if (data) {
          resolve(JSON.parse(data));
        } else {
          client.set(key, JSON.stringify(request));
          resolve(request);
        }
      });
    });
  }
}

export default CacheHandler;
