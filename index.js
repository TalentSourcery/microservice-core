// Importing environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './envs/dev.env' });

// Connecting to the database
import mongoose from 'mongoose';
const { DB_URL } = process.env;
await mongoose.connect(DB_URL);

// Importing the HTTP server built with Express
import server from './server.js';

// Importing modules
import logger from './src/logs/logger.js';

// Starting the HTTP server
const { ENVIRONMENT, PORT_EXAMPLE } = process.env;
server.listen(PORT_EXAMPLE, () => {
  logger.info(`${ENVIRONMENT} Environment`);
  logger.info(`HTTP server is listening on port ${PORT_EXAMPLE}`);
});
