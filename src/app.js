import 'dotenv/config';
import express from 'express';
import { CLIENT_URL } from './config/env.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);

app.get('/api/health', (req, res) => res.json({ success: true }));
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
 
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
