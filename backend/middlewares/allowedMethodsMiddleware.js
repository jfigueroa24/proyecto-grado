import { modelUser } from '../models/userModel.js';

export const validateAllowedMethods = (method) => {
  return async (req, res, next) => {
    try {
      const { base_path, nombre_api } = req.params;
      const pathUser = await modelUser.getBasePath(base_path);

      if (!pathUser) {
        return res.status(404).json({
          message: `User not found with base_path`,
        });
      }
      const methods = await modelUser.getApiByBasePathAndName(
        base_path,
        nombre_api
      );
      if (!methods || methods.length === 0) {
        return res.status(404).json({
          message: `Api ${nombre_api} not found`,
        });
      }

      if (!methods.allowed_methods.includes(method)) {
        return res.status(405).json({
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
