import { pool } from '../config/db.js';

export class modelApi {
  static async getAllApis(id_user) {
    try {
      const result = await pool.query(
        'SELECT * FROM apis WHERE id_user = $1;',
        [id_user]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error retrieving APIs' + error.message);
    }
  }
  static async getApi(api_id, id_user) {
    try {
      const result = await pool.query(
        'SELECT * FROM apis WHERE id = $1 AND id_user = $2;',
        [api_id, id_user]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error retrieving APIs' + error.message);
    }
  }

  static async createApi({ name, description, id_user, allowed_methods }) {
    try {
      const apiExists = await pool.query(
        'SELECT * FROM apis WHERE id_user = $1 AND nombre = $2;',
        [id_user, name]
      );

      if (apiExists.rowCount > 0) {
        return null;
      }

      const result = await pool.query(
        'INSERT INTO apis (nombre, description, id_user, allowed_methods) VALUES ($1, $2, $3, $4) RETURNING *;',
        [name, description, id_user, allowed_methods]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating API: ' + error.message);
    }
  }

  static async updateApi(id, id_user, nombre, description, allowed_methods) {
    try {
      const apiExists = await pool.query(
        'SELECT * FROM apis WHERE id_user = $1 AND nombre = $2;',
        [id_user, nombre]
      );

      if (apiExists.rowCount > 0) {
        return null;
      }
      console.log(id, id_user, nombre, description, allowed_methods);
      const result = await pool.query(
        'UPDATE apis SET nombre = $1, description = $2, allowed_methods = $3 WHERE id = $4 AND id_user = $5 RETURNING *;',
        [nombre, description, allowed_methods, id, id_user]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Error updating the API: ' + error.message);
    }
  }

  static async deleteApi(id, id_user) {
    try {
      const result = await pool.query(
        'DELETE FROM apis WHERE id = $1 AND id_user = $2 RETURNING *;',
        [id, id_user]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error deleting the API: ' + error.message);
    }
  }

  static async findApiById(id, id_user) {
    try {
      const result = await pool.query(
        'SELECT * FROM apis WHERE id = $1 AND id_user = $2;',
        [id, id_user]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching by id and user' + error.message);
    }
  }

  static async getIdByName(nombre_api) {
    try {
      const result = await pool.query(
        'SELECT id FROM apis WHERE nombre = $1;',
        [nombre_api]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching by name' + error.message);
    }
  }
}
