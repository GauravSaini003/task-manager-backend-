import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { AppError } from '../middleware/errorHandler.js';

const findOwnedProject = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, owner: userId });
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

const findOwnedTask = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) throw new AppError('Task not found', 404);
  return task;
};

// GET /api/projects/:projectId/tasks : all tasks inside one project
export const getTasks = async (req, res) => {
  await findOwnedProject(req.params.projectId, req.user._id);

  const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: -1 });
  res.json({ success: true, data: tasks });
};

// POST /api/projects/:projectId/tasks : add a task inside a project
export const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  // 1. The project must exist AND belong to this user
  const project = await findOwnedProject(req.params.projectId, req.user._id);

  // 2. Save the task, linked to the project and the user by their ids
  const task = await Task.create({
    title,
    description,
    status, // if not sent, the model default 'todo' is used
    project: project._id,
    owner: req.user._id,
  });

  // 3. Reply with the created task
  res.status(201).json({ success: true, data: task });
};

// PUT /api/tasks/:id : edit title / description / status
export const updateTask = async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user._id);

  task.title = req.body.title;
  if (req.body.description !== undefined) task.description = req.body.description;
  if (req.body.status) task.status = req.body.status;
  await task.save();

  res.json({ success: true, data: task });
};

// PATCH /api/tasks/:id/status : change only the status (Todo / In Progress / Done)
export const updateTaskStatus = async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user._id);

  task.status = req.body.status;
  await task.save();

  res.json({ success: true, data: task });
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user._id);
  await task.deleteOne();

  res.json({ success: true, data: { id: task._id } });
};
