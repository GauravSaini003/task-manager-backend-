import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

const connectDatabase = async () => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  await mongoose.connect(MONGO_URI);
};

export default connectDatabase;
