import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';
import path from 'path';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Routers
import authRouter from './routes/user.js';

export const runApp = () => {
  const app = express();

  app.use(
    cors({
      origin: '*',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    })
  );

  app.use(express.json({ limit: '100mb' }));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(morgan('common'));
  // Prevent SQL injection by sanatizing the received data
  app.use(mongoSanitize());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.set('trust proxy', true);
  app.use(
    rateLimiter({
      windowMs: 1 * 60 * 1000,
      max: 300,
    })
  );

  /**
   * Limiter | number of requests for login and signup routes
   */
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 6, // Limit each IP to 6 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  /**
   * Limit speed of requests after a 100
   */
  const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests to go at full-speed, then...
    delayMs: 500, // 101th request has a 500ms delay, 7th has a 1000ms delay, 8th gets 1500ms, etc.
  });

  /**
   * Limiter | number of requests for all other routes of the project
   */
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  //documentation
  app.get('/api', (req, res) => {
    res.send(
      "<h1>Welcome to Piiquante API</h1><br><a href='/api-docs'>Documetation</a>"
    );
  });

  // ROUTING
  const __dirname = path.resolve();
 app.use('/images', express.static(path.join(__dirname, 'public')));
 app.use('/api/auth', authRouter);
  return app;
};

export const closeApp = (app) => {
  // Middleware for Errors
  // app.use(errorHandlerMiddleware);
  app.use('*', (req, res, next) => {
    res.status(404).json({
      success: false,
      server: 'online',
      message: 'api endpoint not found',
    });
  });
};
