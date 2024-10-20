import { Router } from 'express';
import { apiController } from '../controllers/apiController.js';
import { validateAllowedMethods } from '../middlewares/allowedMethodsMiddleware.js';

export const publicApiRouter = Router();

publicApiRouter.get(
  '/:base_path/:nombreApi/',
  validateAllowedMethods('GET'),
  apiController.getResponses
);

publicApiRouter.get(
  '/:base_path/:nombreApi/:idRegistro',
  validateAllowedMethods('GET'),
  apiController.getResponseById
);

publicApiRouter.post(
  '/:base_path/:nombreApi',
  validateAllowedMethods('POST'),
  apiController.createResponse
);

publicApiRouter.put(
  '/:base_path/:nombreApi/:idRegistro',
  validateAllowedMethods('PUT'),
  apiController.updateApiResponse
);

publicApiRouter.delete(
  '/:base_path/:nombreApi/:idRegistro',
  validateAllowedMethods('DELETE'),
  apiController.deleteApiResponse
);
