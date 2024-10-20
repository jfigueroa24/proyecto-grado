import { pool } from '../config/db.js';
import { randomUUID } from 'node:crypto';

export class modelResponse {
  static async createResponse(api_id, json_data) {
    try {
      const jsonWithHash = json_data.map((item) => {
        const id_hash = '_' + randomUUID();

        return {
          ...item,
          id_hash: id_hash,
        };
      });
      console.log(jsonWithHash);
      const result = await pool.query(
        'INSERT INTO respuestas (api_id,json_data) VALUES ($1,$2) RETURNING *',
        [api_id, JSON.stringify(jsonWithHash)]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating response: ${error.message}`);
    }
  }

  static async getResponses(api_id) {
    try {
      const result = await pool.query(
        'SELECT json_data FROM respuestas WHERE api_id = $1',
        [api_id]
      );
      return result.rows[0]?.json_data || [];
    } catch (error) {
      throw new Error(`Error fetching response: ${error.message}`);
    }
  }

  static async getResponseId(api_id, idRegistro) {
    try {
      const result = await pool.query(
        'SELECT json_data FROM respuestas WHERE api_id = $1',
        [api_id]
      );

      if (result.rows.length === 0) {
        return null;
      }
      const jsonData = result.rows[0].json_data;

      const response = jsonData.find((item) => item.id_hash === idRegistro);
      return response || null;
    } catch (error) {
      throw new Error(`Error fetching response by ID: ${error.message}`);
    }
  }

  static async updateResponse(nombreApi, idRegistro, updatedData) {
    try {
      const { rows } = await pool.query(
        'SELECT id FROM apis WHERE nombre = $1',
        [nombreApi]
      );
      const api_id = rows[0]?.id;
      if (!api_id) {
        return null;
      }
      const result = await pool.query(
        'SELECT json_data FROM respuestas WHERE api_id = $1',
        [api_id]
      );
      if (result.rows.length === 0) {
        return null;
      }
      const jsonData = result.rows[0].json_data;

      const recordExists = jsonData.some((item) => item.id_hash === idRegistro);
      if (!recordExists) {
        return null;
      }

      const updatedJsonData = jsonData.map((item) => {
        if (item.id_hash === idRegistro) {
          return { ...item, ...updatedData };
        }
        return item;
      });
      const updatedResult = await pool.query(
        'UPDATE respuestas SET json_data = $1 WHERE api_id = $2 RETURNING *',
        [JSON.stringify(updatedJsonData), api_id]
      );
      return updatedResult.rows[0];
    } catch (error) {
      throw new Error(`Error updating response: ${error.message}`);
    }
  }

  static async deleteResponse(nombreApi, idRegistro) {
    try {
      const { rows } = await pool.query(
        'SELECT id FROM apis WHERE nombre = $1',
        [nombreApi]
      );
      const api_id = rows[0]?.id;
      if (!api_id) {
        return null;
      }
      const result = await pool.query(
        'SELECT json_data FROM respuestas WHERE api_id = $1',
        [api_id]
      );
      if (result.rows.length === 0) {
        return null;
      }

      const jsonData = result.rows[0].json_data;

      const recordExists = jsonData.some((item) => item.id_hash === idRegistro);
      if (!recordExists) {
        return null;
      }

      const updatedJsonData = jsonData.filter(
        (item) => item.id_hash !== idRegistro
      );

      const updatedResult = await pool.query(
        'UPDATE respuestas SET json_data = $1 WHERE api_id = $2 RETURNING *',
        [JSON.stringify(updatedJsonData), api_id]
      );

      return updatedResult.rows[0];
    } catch (error) {
      throw new Error(`Error deleting response: ${error.message}`);
    }
  }
}
