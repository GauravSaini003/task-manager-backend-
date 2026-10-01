import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';

const createAccessToken = (userId) =>
  jwt.sign({ id: userId }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });

const createRefreshToken = (userId) =>
  jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

// Shared by register and login: make both tokens, save the refresh token in DB, reply
const sendAuthResponse = async (res, user, statusCode) => {
  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  await User.updateOne({ _id: user._id }, { refreshToken });

  res.status(statusCode).json({
    success: true,
    data: {
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    },
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already registered', 409);

  // Hash before saving. The real password is never stored.
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  await sendAuthResponse(res, user, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // password is hidden by default, so we ask for it explicitly
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('Invalid email or password', 401);

  // Hashes the typed password and compares it with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  await sendAuthResponse(res, user, 200);
};

// Exchange a valid refresh token for a new access token
export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new AppError('Refresh token is required', 401);

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  // The token must also match the one saved in the DB (so logout really works)
  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError('Refresh token not recognised', 401);
  }

  res.json({ success: true, data: { accessToken: createAccessToken(user._id) } });
};

// Remove the refresh token from the DB so it can never be used again
export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  await User.updateOne({ refreshToken }, { refreshToken: null });
  res.json({ success: true, data: { message: 'Logged out' } });
};
