// Importing necessary packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cron from 'node-cron';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';
import path from 'path';
import utility from './constants/utility.js';

// Routers
import authRouter from './routes/user.js';
import sauceRouter from './routes/sauce.js';

// Function to run the application
export const runApp = () => {
  const app = express();
  // Middleware for enabling CORS (Cross-Origin Resource Sharing)
  app.use(
    cors({
      origin: '*',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    })
  );
  // Middleware for parsing JSON request bodies
  app.use(express.json({ limit: '100mb' }));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  // Middleware for logging HTTP requests The morgan middleware is added to the application using app.use(morgan('common')), which means that it will be applied to all incoming requests, and the logs will be printed to the console.
  app.use(morgan('common'));
  // Middleware for sanitizing user-supplied data to prevent MongoDB Operator Injection
  app.use(mongoSanitize());
  // Middleware for rate limiting requests
  app.use(
    rateLimiter({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 60, // Maximum of 60 requests per minute
    })
  );

  // Middleware for serving static files (e.g., images)
  const __dirname = path.resolve();
  app.use('/images', express.static(path.join(__dirname, 'images')));

  if (process.env.NODE_ENV !== 'production') {
    // it's common to use morgan('dev') instead of morgan('common'). The "dev" format provides more concise and human-readable logs, making it easier to debug and monitor the application during development.
    app.use(morgan('dev'));
  }

  //documentation
  app.get('/api', (req, res) => {
    res.send(
      "<h1>Welcome to Piiquante API</h1><br><a href='/api-docs'>Documetation</a>"
    );
  });

  // ROUTING
  // Authentication routes
  app.use('/api/auth', authRouter);
  // API routes for sauces
  app.use('/api', sauceRouter);

  // Schedule a task
  cron.schedule('59 23 * * *', () => {
    console.log('[cron]: task running every day at 11:59 PM');
    utility.deleteExpiredAuthTokens();
  });

  return app;
};

export const closeApp = (app) => {
  // Middleware for Errors
  // Middleware for handling 404 (Not Found) errors
  app.use('*', (req, res, next) => {
    res.status(404).json({
      success: false,
      server: 'online',
      message: 'api endpoint not found',
    });
  });
};
