import jwt from 'jsonwebtoken';
import { modelUser } from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await modelUser.findById(decoded.id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = {
      id_user: user.id,
      base_path: user.base_path,
      indice: user.indice,
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res
        .status(401)
        .json({ message: 'Unauthorized', error: error.message });
    }
  }
};
