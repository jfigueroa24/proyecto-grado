import express from 'express';
import { PORT } from './config.js';
import { userRouter } from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

app.use('/api/users', userRouter);

app.listen(PORT);
console.log(`Server listen on http://localhost:${PORT}`);
