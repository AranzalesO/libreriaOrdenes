import { Router } from 'express';
const router = Router();
import Request from '../models/Request.js';
import HandlesChain from '../chain/HandlesChain.js';

import AuthenticationHandler from '../handlers/AuthenticationHandler.js';
import SanitizeDataHandler from '../handlers/SanitizeDataHandler.js';
import BruteForceFilterHandler from '../handlers/BruteForceFilterHandler.js';
import CacheHandler from '../handlers/CacheHandler.js';

router.post('/process-request', async (req, res) => {
  const { username, password, data, ipAddress, apiKey } = req.body;

  const request = new Request(username, password, data, ipAddress);

  const chain = new HandlesChain();

  // Se agregan los manejadores en el orden que se pide
  chain.addHandler(new AuthenticationHandler(apiKey));
  chain.addHandler(new SanitizeDataHandler());
  chain.addHandler(new BruteForceFilterHandler());
  chain.addHandler(new CacheHandler());

  try {
    const result = await chain.handle(request);
    res.status(200).json({ message: 'Request processed successfully', data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
