import mongoose from 'mongoose';
import { TASK_STATUSES } from '../config/constants.js';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, trim: true, default: '' },
    // Stored as a string. enum only allows todo / in-progress / done.
    status: { type: String, enum: TASK_STATUSES, default: 'todo' },
    // Which project this task belongs to (the project's _id)
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    // Which user owns it (the user's _id)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);
