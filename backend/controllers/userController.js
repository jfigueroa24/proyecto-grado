import { modelUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config.js';

export class userController {
  // CREATE USER
  static async create(req, res) {
    const { nombre, email, password } = req.body;
    try {
      const existingUser = await modelUser.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await modelUser.createUser({
        nombre,
        email,
        password: hashPassword,
      });
      res
        .status(201)
        .json({ message: 'User successfully created', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }
  // LOGIN
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await modelUser.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'The user does not exist' });
      }
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
      const token = jwt.sign(
        { id_user: user.id, basePath: user.base_path, index: user.indice },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res
        .status(200)
        .json({ mensaje: 'Successful login', token: token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
