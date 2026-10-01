import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/db.js';
import { port } from './config/env.js';

const startServer = async () => {
  await connectDatabase();
  app.listen(port);
};

startServer().catch(() => {
  process.exitCode = 1;
});
