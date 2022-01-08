import mongoose from 'mongoose';
import { userSchema } from './schemas.js';

const User = mongoose.model('User', userSchema);

export {
  User,
};
