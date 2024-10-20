import express from 'express';
import { PORT } from './config.js';
import { router } from './routes/index.js';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/', router);

app.listen(PORT);
console.log(`Server listen on http://localhost:${PORT}`);
