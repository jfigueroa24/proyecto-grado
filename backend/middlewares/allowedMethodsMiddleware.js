import { modelApi } from '../models/apiModel.js';

export const validateAllowedMethods = (method) => {
  return async (req, res, next) => {
    try {
      const { base_path, nombreApi } = req.params;
      let api = null;
      if (nombreApi === undefined) {
        api = await modelApi.getAllApis(base_path);
      } else {
        api = await modelApi.getApiByBasePathAndName(nombreApi, base_path);
      }
      if (!api) {
        return res.status(404).json({ message: 'API not found' });
      }
      if (!api[0].allowed_methods.includes(method)) {
        return res.status(403).json({
          message: `The method ${method} is not allowed for this API.`,
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Error validating API methods',
        error: error.message,
      });
    }
  };
};
