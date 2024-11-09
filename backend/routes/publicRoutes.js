import { Router } from 'express';
import { apiController } from '../controllers/apiController.js';
import { validateAllowedMethods } from '../middlewares/allowedMethodsMiddleware.js';

export const publicApiRouter = Router();

publicApiRouter.get(
  '/:base_path/:nombre_api',
  validateAllowedMethods('GET'),
  apiController.getResponses
);

publicApiRouter.get(
  '/:base_path/:nombre_api/:indice',
  validateAllowedMethods('GET'),
  apiController.getResponseById
);
