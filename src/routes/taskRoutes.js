import express from 'express';
import { protect } from '../middleware/auth.js';
import { taskRules, statusRules } from '../middleware/validate.js';
import { updateTask, updateTaskStatus, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.use(protect);

router.route('/:id').put(taskRules, updateTask).delete(deleteTask);
router.patch('/:id/status', statusRules, updateTaskStatus);

export default router;
