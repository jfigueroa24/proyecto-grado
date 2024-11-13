import { modelApi } from '../models/apiModel.js';

export const validateApiOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_user } = req.user;
    let api = null;
    if (id === undefined) {
      api = await modelApi.getAllApis(id_user);
    } else {
      api = await modelApi.findApiById(id, id_user);
    }
    if (!api || api.length === 0) {
      return res.status(404).json({ message: 'API not found' });
    }
    if (api[0].id_user !== id_user) {
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
