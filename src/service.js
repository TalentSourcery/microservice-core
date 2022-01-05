import { User } from './database/models.js';
import mongoose from 'mongoose';
import jsonWebToken from 'jsonwebtoken';
import NotFound from './errors/not-found.js';
import BadRequest from './errors/bad-request.js';

const service = {
  async healthCheck() {
    const dbConnectionState = mongoose.connection.readyState;
    if (dbConnectionState === 1) {
      const health = {
        status: 'healthy',
        dbConnectionState: 'connected',
        uptime: process.uptime(),
      };
      return {
        success: true,
        data: health,
        error: null,
      };
    } else {
      throw new Error('Service is unhealthy');
    }
  },
  async create(info) {
    const userExists = await User.findOne(info);
    if (userExists !== null) throw new BadRequest(`User ${info.email} already in database`);
    const user = await User.create(info);
    await user.save();
    return {
      success: true,
      data: user,
      error: null,
    };
  },
  async authenticate(credentials) {
    const user = await User.findOne(credentials);
    if (user === null) throw new NotFound(`User ${credentials.email} not found in database`);
    const secret = process.env.JWT_USERS_SECRET;
    const options = {
      algorithm: 'HS256',
      expiresIn: '24h',
    };
    const jwt = await jsonWebToken.sign(credentials, secret, options);
    return {
      success: true,
      data: { jwt },
      error: null,
    };
  },
  async read(email) {
    const user = await User.findOne({ email });
    if (user === null) throw new NotFound(`User ${email} not found in database`);
    return {
      success: true,
      data: user,
      error: null,
    };
  },
  async update(email, newInfo) {
    const result = await User.updateOne({ email }, newInfo);
    return {
      success: true,
      data: result,
      error: null,
    };
  },
  async delete(email) {
    const userExists = await User.findOne({ email });
    if (userExists === null) throw new NotFound(`User ${email} not found in database`);
    const result = await User.deleteOne({ email });
    return {
      success: true,
      data: result,
      error: null,
    };
  },
};

export default service;
