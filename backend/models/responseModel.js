import { pool } from '../config/db.js';

export class modelResponse {
  static async createResponse(api_id, json_data) {
    try {
      const insertPromises = json_data.map(async (item) => {
        const result = await pool.query(
          'INSERT INTO respuestas (api_id, json_data) VALUES ($1, $2) RETURNING *;',
          [api_id, JSON.stringify(item)]
        );
        return result.rows[0];
      });

      const insertedRows = await Promise.all(insertPromises);

      return insertedRows;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating response: ${error.message}`);
    }
  }

  static async getResponses(api_id) {
    try {
      const result = await pool.query(
        'SELECT indice, json_data FROM respuestas WHERE api_id = $1;',
        [api_id]
      );
      return result.rows.map((row) => ({
        indice: row.indice,
        json_data: row.json_data,
      }));
    } catch (error) {
      throw new Error(`Error fetching response: ${error.message}`);
    }
  }

  static async getResponseId(api_id, indice) {
    try {
      const result = await pool.query(
        'SELECT json_data FROM respuestas WHERE indice = $1 AND api_id = $2;',
        [indice, api_id]
      );

      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching response by Index: ${error.message}`);
    }
  }

  static async updateResponse(api_id, indice, updatedData) {
    try {
      const result = await pool.query(
        'UPDATE respuestas SET json_data = $1 WHERE api_id = $2 AND indice = $3 RETURNING *;',
        [updatedData, api_id, indice]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating response: ${error.message}`);
    }
  }

  static async deleteResponse(api_id, indice) {
    try {
      const result = await pool.query(
        'DELETE FROM respuestas WHERE api_id = $1 AND indice = $2 RETURNING *;',
        [api_id, indice]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting response: ${error.message}`);
    }
  }
}
