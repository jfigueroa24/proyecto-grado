import { pool } from '../config/db.js';
import { randomUUID } from 'node:crypto';
import { modelUser } from './userModel.js';

export class modelApi {
  static async getAllApis(base_path) {
    try {
      const user = await modelUser.getIdByBasePath(base_path);
      const result = await pool.query('SELECT * FROM apis WHERE id_user = $1', [
        user,
      ]);

      return result.rows;
    } catch (error) {
      throw new Error('Error retrieving APIs' + error.message);
    }
  }
  static async getApi(api_id, id_user) {
    try {
      const result = await pool.query(
        'SELECT * FROM apis WHERE id = $1 AND id_user = $2',
        [api_id, id_user]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Error retrieving APIs' + error.message);
    }
  }
  static async createApi({
    nombre,
    description,
    id_user,
    base_url,
    allowed_methods,
  }) {
    try {
      const id = randomUUID();
      const result = await pool.query(
        'INSERT INTO apis (id, nombre, description, id_user, base_url, allowed_methods, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
        [id, nombre, description, id_user, base_url, allowed_methods]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating API: ' + error.message);
    }
  }

  static async updateApi(nombreDeLaApi, id_user, newMethods) {
    try {
      const currentMethodsResult = await pool.query(
        'SELECT allowed_methods FROM apis WHERE nombre = $1 AND id_user = $2',
        [nombreDeLaApi, id_user]
      );
      if (currentMethodsResult.rowCount === 0) {
        return null;
      }

      const currentMethods = currentMethodsResult.rows[0].allowed_methods || [];
      const updatedMethods = Array.from(
        new Set([...currentMethods, ...newMethods])
      );

      const result = await pool.query(
        `UPDATE apis
          SET allowed_methods = $1
          WHERE nombre = $2 AND id_user = $3
          RETURNING *`,
        [updatedMethods, nombreDeLaApi, id_user]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Error updating the API: ' + error.message);
    }
  }

  static async deleteApi(nombreDeLaApi, id_user) {
    try {
      const result = await pool.query(
        `DELETE FROM apis WHERE nombre = $1 AND id_user = $2 RETURNING *`,
        [nombreDeLaApi, id_user]
      );
      if (result.rowCount === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new Error('Error deleting the API: ' + error.message);
    }
  }

  static async findByNameAndUserId(nombreDeLaApi, id_user) {
    const result = await pool.query(
      'SELECT * FROM apis WHERE nombre = $1 AND id_user = $2',
      [nombreDeLaApi, id_user]
    );
    return result.rows[0];
  }

  static async getApiByBasePathAndName(nombreApi, base_path) {
    try {
      const result = await pool.query(
        'SELECT apis.* FROM apis JOIN usuarios ON usuarios.id = apis.id_user WHERE usuarios.base_path = $1 AND apis.nombre = $2',
        [base_path, nombreApi]
      );
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows;
    } catch (error) {
      throw new Error(
        `Error fetching API by base_path and name: ${error.message}`
      );
    }
  }
}
