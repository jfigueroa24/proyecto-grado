import { modelApi } from '../models/apiModel.js';
import { modelResponse } from '../models/responseModel.js';
import { modelUser } from '../models/userModel.js';

export class apiController {
  static async getApis(req, res) {
    try {
      const { id_user } = req.user;
      const apis = await modelApi.getAllApis(id_user);
      const apisWithResponses = await Promise.all(
        apis.map(async (api) => {
          const responses = await modelResponse.getResponses(api.id);
          return { api, responses };
        })
      );
      return res.status(200).json(apisWithResponses);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getApi(req, res) {
    try {
      const { id_user } = req.user;
      const { id } = req.params;
      const api = await modelApi.findApiById(id, id_user);
      const responses = await modelResponse.getResponses(api[0].id);

      return res.status(200).json({ api, responses });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createApi(req, res) {
    try {
      const { id_user } = req.user;
      const { nombre, description, allowed_methods, json_data } = req.body;
      const newApi = await modelApi.createApi({
        nombre,
        description,
        id_user,
        allowed_methods,
      });

      if (newApi === null) {
        return res
          .status(400)
          .json({ message: 'API with this name already exists for this user' });
      }

      let newResponse = null;
      if (json_data) {
        newResponse = await modelResponse.createResponse(newApi.id, json_data);
      }

      return res.status(201).json({
        message: 'API created successfully',
        newApi,
        initialResponse: newResponse || 'No initial JSON data provided',
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateApi(req, res) {
    try {
      const { id_user } = req.user;
      const { id } = req.params;
      const { nombre, description, allowed_methods } = req.body;

      const updateApi = await modelApi.updateApi(
        id,
        id_user,
        nombre,
        description,
        allowed_methods
      );

      if (updateApi === null) {
        return res
          .status(400)
          .json({ message: 'API with this name already exists for this user' });
      }

      return res
        .status(200)
        .json({ message: 'API methods updated successfully', updateApi });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteApi(req, res) {
    try {
      const { id_user } = req.user;
      const { id } = req.params;

      const deletedApi = await modelApi.deleteApi(id, id_user);

      return res
        .status(200)
        .json({ message: 'API deleted successfully', deletedApi });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getResponses(req, res) {
    try {
      const { base_path, nombre_api } = req.params;
      const api_id = await modelUser.getApiByBasePathAndName(
        base_path,
        nombre_api
      );

      const responses = await modelResponse.getResponses(api_id.id);
      if (!responses) {
        return res.status(404).json({ error: 'Responses not found' });
      }

      return res.status(200).json({ responses });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getResponseById(req, res) {
    try {
      const { base_path, nombre_api, indice } = req.params;
      const api_id = await modelUser.getApiByBasePathAndName(
        base_path,
        nombre_api
      );

      const response = await modelResponse.getResponseId(api_id.id, indice);
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async createResponse(req, res) {
    try {
      const { base_path, nombre_api } = req.params;
      const { json_data } = req.body;
      const api_id = await modelUser.getApiByBasePathAndName(
        base_path,
        nombre_api
      );
      if (!api_id) {
        return res.status(404).json({ error: 'API not found' });
      }
      const response = await modelResponse.createResponse(api_id.id, json_data);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateResponse(req, res) {
    try {
      const { updatedData } = req.body;
      const { base_path, nombre_api, indice } = req.params;
      const api_id = await modelUser.getApiByBasePathAndName(
        base_path,
        nombre_api
      );
      const response = await modelResponse.updateResponse(
        api_id.id,
        indice,
        updatedData
      );

      if (!response) {
        return res.status(404).json({
          message: 'Response not found.',
        });
      }

      return res
        .status(200)
        .json({ message: 'Response updated successfully', response });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteResponse(req, res) {
    try {
      const { base_path, nombre_api, indice } = req.params;
      const api_id = await modelUser.getApiByBasePathAndName(
        base_path,
        nombre_api
      );
      const response = await modelResponse.deleteResponse(api_id.id, indice);

      if (!response) {
        return res.status(404).json({
          message: 'Response not found.',
        });
      }

      return res
        .status(200)
        .json({ message: 'Response deleted successfully', response });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
