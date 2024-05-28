import IHandler from './IHandler.js';
import NodeCache from 'node-cache';
const cache = new NodeCache();

class CacheHandler extends IHandler {
  async handle(request) {
    const key = `${request.username}-${request.data}`;
    try {
      const cachedData = cache.get(key);
      if (cachedData) {
        return cachedData;
      } else {
        cache.set(key, request, 3600); // Cache for 1 hour
        return request;
      }
    } catch (err) {
      throw new Error('Cache error');
    }
  }
}

export default CacheHandler;
