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

publicApiRouter.post(
  '/:base_path/:nombre_api',
  validateAllowedMethods('POST'),
  apiController.createResponse
);
//ARREGLAR POSIBLES ERRORES
publicApiRouter.put(
  '/:base_path/:nombre_api/:indice',
  validateAllowedMethods('PUT'),
  apiController.updateResponse
);
//ARREGLAR POSIBLES ERRORES
publicApiRouter.delete(
  '/:base_path/:nombre_api/:indice',
  validateAllowedMethods('DELETE'),
  apiController.deleteResponse
);
