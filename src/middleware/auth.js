import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_ACCESS_SECRET } from '../config/env.js';
import { AppError } from './errorHandler.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Not authorized, token missing', 401);
  }

  const token = header.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User no longer exists', 401);

  req.user = user;
  next();
};
