import { pool } from '../config/db.js';
import { randomUUID } from 'node:crypto';

export class modelUser {
  static async createUser({ nombre, email, password }) {
    try {
      const base_path = randomUUID();
      console.log({ nombre, email, password });
      const newUser = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, base_path) VALUES ($1, $2, $3, $4) RETURNING *;',
        [nombre, email, password, base_path]
      );

      return newUser.rows[0];
    } catch (error) {
      return new Error('Error creating user: ', error);
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al buscar el usuario por email' + error.message);
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching by Id' + error.message);
    }
  }

  static async getApiByBasePathAndName(base_path, nombre_api) {
    const result = await pool.query(
      'SELECT apis.id,allowed_methods FROM apis JOIN usuarios ON usuarios.id = apis.id_user WHERE usuarios.base_path = $1 AND apis.nombre = $2',
      [base_path, nombre_api]
    );

    return result.rows[0];
  }

  static async getBasePath(base_path) {
    const result = await pool.query(
      'SELECT base_path FROM usuarios WHERE base_path = $1',
      [base_path]
    );
    return result.rows[0];
  }
}
