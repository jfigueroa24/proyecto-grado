import { Router } from 'express';
import { apiController } from '../controllers/apiController.js';
import { validateAllowedMethods } from '../middlewares/allowedMethodsMiddleware.js';
import { authenticate } from '../middlewares/authenticationMiddleware.js';
import { validateApiOwnership } from '../middlewares/apiOwnerMiddleware.js';
import { validateBasePath } from '../middlewares/validateBasePath.js';

export const privateApiRouter = Router();

privateApiRouter.use(authenticate);

privateApiRouter.get(
  '/:base_path/',
  validateApiOwnership,
  validateAllowedMethods('GET'),
  apiController.getAllApis
);

privateApiRouter.get(
  '/:base_path/:nombreApi',
  validateApiOwnership,
  validateAllowedMethods('GET'),
  apiController.getApi
);

privateApiRouter.post(
  '/:base_path/',
  validateBasePath,
  apiController.createApi
);

privateApiRouter.put(
  '/:base_path/:nombreApi',
  validateAllowedMethods('PUT'),
  validateApiOwnership,
  apiController.updateApiMethods
);

privateApiRouter.delete(
  '/:base_path/:nombreApi',
  validateAllowedMethods('DELETE'),
  validateApiOwnership,
  apiController.deleteApi
);
