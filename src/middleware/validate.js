import { body, validationResult } from 'express-validator';
import { AppError } from './errorHandler.js';
import { TASK_STATUSES } from '../config/constants.js';

// Runs after the rules below and stops the request if any rule failed
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }
  next();
};

export const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().toLowerCase().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidation,
];

export const loginRules = [
  body('email').trim().toLowerCase().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

export const projectRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ max: 100 })
    .withMessage('Project name must be under 100 characters'),
  handleValidation,
];

export const taskRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 150 })
    .withMessage('Task title must be under 150 characters'),
  body('status').optional().isIn(TASK_STATUSES).withMessage('Invalid status'),
  handleValidation,
];

export const statusRules = [
  body('status').isIn(TASK_STATUSES).withMessage('Invalid status'),
  handleValidation,
];
