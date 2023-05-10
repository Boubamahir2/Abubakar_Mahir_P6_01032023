import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';
import path from 'path';

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
  app.use(mongoSanitize());
  app.set('trust proxy', true);
  app.use(
    rateLimiter({
      windowMs: 1 * 60 * 1000,
      max: 300,
    })
  );

  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'public')));

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