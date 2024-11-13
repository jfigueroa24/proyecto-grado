import pg from 'pg';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  JWT_SECRET,
} from '../config.js';

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  jwt_secret: JWT_SECRET,
  ssl: process.env.NODE_ENV !== 'development',
});
