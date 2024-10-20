import { modelApi } from '../models/apiModel.js';

export const validateApiOwnership = async (req, res, next) => {
  try {
    const { nombreApi, base_path } = req.params;
    const userId = req.user.id_user;
    let api = null;
    if (nombreApi === undefined) {
      api = await modelApi.getAllApis(base_path);
    } else {
      api = await modelApi.getApiByBasePathAndName(nombreApi, base_path);
    }

    if (!api || api.length === 0) {
      return res.status(404).json({ message: 'API not found' });
    }

    if (api[0].id_user !== userId) {
      return res.status(403).json({
        message: 'You do not have permission to access or modify this API',
      });
    }

    req.api_id = api.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
