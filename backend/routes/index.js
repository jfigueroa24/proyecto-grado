import Router from 'express';
import { userController } from '../controllers/userController.js';

import { publicApiRouter } from './publicRoutes.js';
import { privateApiRouter } from './privateRoutes.js';

export const router = Router();
router.post('/admin/register', userController.create);
router.post('/admin/login', userController.login);
router.get('/admin/logout', userController.logout);

router.use('/public/', publicApiRouter);

router.use('/api/', privateApiRouter);
