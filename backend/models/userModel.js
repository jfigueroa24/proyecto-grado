import { pool } from '../config/db.js';
import { randomUUID } from 'node:crypto';

export class modelUser {
  static async createUser({ nombre, email, password }) {
    try {
      const base_path = randomUUID();
      const id = randomUUID();
      const newUser = await pool.query(
        'INSERT INTO usuarios (id, nombre, email, password, base_path) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, nombre, email, password, base_path]
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

  static async findByBasePath(base_path) {
    try {
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE base_path = $1',
        [base_path]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(
        'Error al buscar el usuario por basepath' + error.message
      );
    }
  }

  static async findById(id_user) {
    try {
      const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [
        id_user,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(
        'Error al buscar el usuario por basepath' + error.message
      );
    }
  }

  static async getIdByBasePath(base_path) {
    const result = await pool.query(
      'SELECT id FROM usuarios WHERE base_path = $1',
      [base_path]
    );

    return result.rows[0].id;
  }
}
