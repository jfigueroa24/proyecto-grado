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
      //SOLUCIONAR PROBLEMA DE NO CREAR USUARIOS
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al buscar el usuario por email');
    }
  }
}
