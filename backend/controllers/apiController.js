import { modelApi } from '../models/apiModel.js';
import { modelResponse } from '../models/responseModel.js';

export class apiController {
  static async getAllApis(req, res) {
    try {
      const { base_path } = req.params;
      const apis = await modelApi.getAllApis(base_path);
      return res.status(200).json(apis);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getApi(req, res) {
    try {
      const { base_path, nombreApi } = req.params;
      console.log(base_path, nombreApi);
      const api = await modelApi.getApiByBasePathAndName(nombreApi, base_path);
      if (!api) {
        return res.status(404).json({ error: 'API not found' });
      }
      console.log(api[0].id);
      const responses = await modelResponse.getResponses(api[0].id);

      return res.status(200).json({ api, responses });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createApi(req, res) {
    try {
      const { id_user, basePath } = req.user;
      const { nombre, description, allowed_methods, json_data } = req.body;

      const base_url = `/${basePath}/${nombre}/`;

      const newApi = await modelApi.createApi({
        nombre,
        description,
        id_user: id_user,
        base_url,
        allowed_methods,
      });
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

  static async updateApiMethods(req, res) {
    try {
      const { id_user } = req.user;
      const { nombreApi } = req.params;
      const { allowed_methods } = req.body;

      const updateApi = await modelApi.updateApi(
        nombreApi,
        id_user,
        allowed_methods
      );
      if (!updateApi) {
        return res.status(404).json({
          message:
            'API not found or user is not authorized to update this API.',
        });
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
      console.log('Entro deleteApi');
      const { id_user } = req.user;
      const { nombreApi } = req.params;

      const deletedApi = await modelApi.deleteApi(nombreApi, id_user);
      if (!deletedApi) {
        return res.status(404).json({
          message:
            'API not found or user is not authorized to update this API.',
        });
      }

      return res
        .status(200)
        .json({ message: 'API deleted successfully', deletedApi });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getResponses(req, res) {
    try {
      const { base_path, nombreApi } = req.params;
      const api_id = await modelApi.getApiByBasePathAndName(
        nombreApi,
        base_path
      );

      const responses = await modelResponse.getResponses(api_id[0].id);
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
      const { base_path, nombreApi, idRegistro } = req.params;
      const api_id = await modelApi.getApiByBasePathAndName(
        nombreApi,
        base_path
      );

      const response = await modelResponse.getResponseId(
        api_id[0].id,
        idRegistro
      );
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async createResponse(req, res) {
    try {
      const { nombreApi } = req.params;
      const { json_data } = req.body;
      const api_id = modelApi.getApiByBasePathAndName(nombreApi, base_path);
      if (!api_id) {
        return res.status(404).json({ error: 'API not found' });
      }
      const response = await modelResponse.createResponse(api_id, json_data);

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateApiResponse(req, res) {
    try {
      const { nombreApi, idRegistro } = req.params;
      const { updatedData } = req.body;
      const updateResponse = await modelResponse.updateResponse(
        nombreApi,
        idRegistro,
        updatedData
      );

      if (!updateResponse) {
        return res.status(404).json({
          message: 'Response not found.',
        });
      }
      return res
        .status(200)
        .json({ message: 'Response updated successfully', updateResponse });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteApiResponse(req, res) {
    try {
      const { nombreApi, idRegistro } = req.params;
      const deletedResponse = await modelResponse.deleteResponse(
        nombreApi,
        idRegistro
      );

      if (!deletedResponse) {
        return res.status(404).json({
          message: 'Response not found.',
        });
      }

      return res
        .status(200)
        .json({ message: 'Response deleted successfully', deletedResponse });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
