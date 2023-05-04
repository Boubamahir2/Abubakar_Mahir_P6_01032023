import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';
import path from 'path';


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
  // app.use(
  //   fileUpload({
  //     useTempFiles: true,
  //   })
  // );

  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  //documentation
  app.get('/api/v1', (req, res) => {
    res.send(
      "<h1>Welcome to Social media API</h1><br><a href='/api-docs'>Documetation</a>"
    );
  });

  // ROUTING
  // app.use('/api/v1/auth', authRouter);
  // app.use('/api/v1/user', userRouter);
  // app.use('/api/v1/post', postRouter);
  // app.use('/api/v1/dashboard', adminRouter);
  // app.use('/api/v1/notification', notificationRouter);
  // app.use('/api/v1/location-info', locationInfoRouter);
  // app.use('/api/v1/tags', tagRouter);
  // app.use('/api/v1/chat', chatRouter);
  // app.use('/api/v1/update', updateRouter);

  // Schedule a task
  // cron.schedule('59 23 * * *', () => {
  //   console.log('[cron]: task running every day at 11:59 PM');
  //   utility.deleteExpiredOTPs();
  //   utility.deleteOldNotifications();
  //   utility.deleteExpiredAuthTokens();
  // });
  return app;
};
