import { Router } from 'express';
const router = Router();
import Request from '../models/Request';
import HandlesChain from '../chain/HandlesChain';
import AuthenticationHandler from '../handlers/AuthenticationHandler';
import SanitizeDataHandler from '../handlers/SanitizeDataHandler';
import BruteForceFilterHandler from '../handlers/BruteForceFilterHandler';
import CacheHandler from '../handlers/CacheHandler';

router.post('/process-request', async (req, res) => {
  const { username, password, data, ipAddress, apiKey } = req.body;

  const request = new Request(username, password, data, ipAddress);

  const chain = new HandlesChain();
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
