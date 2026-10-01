import express from 'express';
import { register, login, refresh, logout } from '../controllers/authController.js';
import { registerRules, loginRules } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', registerRules, register);
router.post('/login', loginRules, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
