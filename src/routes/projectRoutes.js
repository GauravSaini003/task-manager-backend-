import express from 'express';
import { protect } from '../middleware/auth.js';
import { projectRules, taskRules } from '../middleware/validate.js';
import {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { getTasks, createTask } from '../controllers/taskController.js';

const router = express.Router();

// Every route below needs a valid access token
router.use(protect);

router.route('/').get(getProjects).post(projectRules, createProject);

router.route('/:id').get(getProject).put(projectRules, updateProject).delete(deleteProject);

// Tasks that live inside a project
router.route('/:projectId/tasks').get(getTasks).post(taskRules, createTask);

export default router;
