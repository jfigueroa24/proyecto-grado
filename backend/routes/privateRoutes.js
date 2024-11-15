import { Router } from 'express';
import { apiController } from '../controllers/apiController.js';
import { authenticate } from '../middlewares/authenticationMiddleware.js';
import { validateApiOwnership } from '../middlewares/apiOwnerMiddleware.js';
import { userController } from '../controllers/userController.js';
import { validateAllowedMethods } from '../middlewares/allowedMethodsMiddleware.js';

export const privateApiRouter = Router();

privateApiRouter.use(authenticate);
privateApiRouter.get('/get-user', userController.getUser);
privateApiRouter.get('/get-apis', validateApiOwnership, apiController.getApis);

privateApiRouter.get(
  '/get-api/:id',
  validateApiOwnership,
  apiController.getApi
);

privateApiRouter.post('/create-api', apiController.createApi);

privateApiRouter.put(
  '/update-api/:id',
  validateApiOwnership,
  apiController.updateApi
);

privateApiRouter.delete(
  '/delete-api/:id',
  validateApiOwnership,
  apiController.deleteApi
);

privateApiRouter.post(
  '/:base_path/:nombre_api',
  validateApiOwnership,
  validateAllowedMethods('POST'),
  apiController.createResponse
);

privateApiRouter.put(
  '/:base_path/:nombre_api/:indice',
  validateApiOwnership,
  validateAllowedMethods('PUT'),
  apiController.updateResponse
);

privateApiRouter.delete(
  '/:base_path/:nombre_api/:indice',
  validateApiOwnership,
  validateAllowedMethods('DELETE'),
  apiController.deleteResponse
);
