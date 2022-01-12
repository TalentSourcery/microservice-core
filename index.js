// Importing modules
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './src/logs/logger.js';

// Importing the HTTP server built with Express
import server from './server.js';

// Loading the environment variables
dotenv.config({ path: './envs/dev.env' });

// Connecting to the database
const { DB_URL } = process.env;
await mongoose.connect(DB_URL);

// Starting the HTTP server
const { ENVIRONMENT, PORT_EXAMPLE } = process.env;
server.listen(PORT_EXAMPLE, () => {
  logger.info(`${ENVIRONMENT} Environment`);
  logger.info(`HTTP server is listening on port ${PORT_EXAMPLE}`);
});
