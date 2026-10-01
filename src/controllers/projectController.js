import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { AppError } from '../middleware/errorHandler.js';

const findOwnedProject = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, owner: userId });
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: projects });
};

export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({ name, description, owner: req.user._id });
  res.status(201).json({ success: true, data: project });
};

export const getProject = async (req, res) => {
  const project = await findOwnedProject(req.params.id, req.user._id);
  res.json({ success: true, data: project });
};

export const updateProject = async (req, res) => {
  const project = await findOwnedProject(req.params.id, req.user._id);

  project.name = req.body.name;
  if (req.body.description !== undefined) project.description = req.body.description;
  await project.save();

  res.json({ success: true, data: project });
};

export const deleteProject = async (req, res) => {
  const project = await findOwnedProject(req.params.id, req.user._id);

  await Task.deleteMany({ project: project._id });
  await project.deleteOne();

  res.json({ success: true, data: { id: project._id } });
};
