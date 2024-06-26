import express from 'express';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import routes from './routes/index.js';

const app = express();

app.use(json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});