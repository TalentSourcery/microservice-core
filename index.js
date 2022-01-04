// Importing environment variables
import dotenv from 'dotenv';
dotenv.config();

// Connecting to the database
import mongoose from 'mongoose';
const { DB_URL } = process.env;
await mongoose.connect(DB_URL);

// Importing modules
import express from 'express';
import cors from 'cors';

// Importing Express middleware
import helmet from 'helmet';
import bodyParser from 'body-parser';

// Importing Express router
import router from './src/router.js';

// Importing global error handler
import errorHandler from './src/middleware/error-handler/error.middleware.js';

// Importing handler for endpoints that are not available
import routeNotFoundHandler from './src/middleware/error-handler/404.middleware.js';

// Instantiating the app's HTTP server, both for for backend and frontend atm
const app = express();

// Setting middleware (order matters)
app.use(helmet()); // Sets response headers securely
const corsOptions = {
  origin: 'http://localhost:*',
};
app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(bodyParser.json()); // Parse JSON body

// API routing
app.use('/api/v1/user', router);

// Setting global error handler
app.use(errorHandler);

// Setting handler for endpoints that are not available (404 error handler)
app.use(routeNotFoundHandler);

// Starting the HTTP server
const { ENVIRONMENT, PORT_EXAMPLE } = process.env;
app.listen(PORT_EXAMPLE, () => {
  console.log(`${ENVIRONMENT} Environment`);
  console.log(`HTTP server is listening on port ${PORT_EXAMPLE}`);
});
