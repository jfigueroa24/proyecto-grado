import Router from 'express';
import { userController } from '../controllers/userController.js';

export const userRouter = Router();
// Ruta para crear usuario
userRouter.post('/register', userController.create);
userRouter.post('/login', userController.login);
