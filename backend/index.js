import express from 'express';
import { PORT } from './config.js';
import { router } from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use('/', router);

app.listen(PORT);
console.log(`Server listen on http://localhost:${PORT}`);
