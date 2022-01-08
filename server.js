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
const server = express();

// Setting middleware (order matters)
server.use(helmet()); // Sets response headers securely
const corsOptions = {
  origin: 'http://localhost:*',
};
server.use(cors(corsOptions)); // Use this after the variable declaration
server.use(bodyParser.json()); // Parse JSON body

// API routing
server.use('/api/v1/user', router);

// Setting global error handler
server.use(errorHandler);

// Setting handler for endpoints that are not available (404 error handler)
server.use(routeNotFoundHandler);

export default server;
