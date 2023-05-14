import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { runApp, closeApp } from './app.js';

// app
const app = runApp();

dotenv.config();

// la fonction normalizePort renvoit un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");

const connectToDatabase = async () => {
  try {
    console.log('[database]: connecting to MongoDB...');
    await mongoose.set('strictQuery', false).connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('[database]: connected successfully to MongoDB');

    // Health Route
    app.use('/api/v1/health', (req, res, next) => {
      res.status(200).json({
        success: true,
        server: 'online',
        message: 'server is up and running',
      });
    });

    // Error Handler
    closeApp(app);

    const server = app.listen(port, (err) => {
      if (err) {
        console.log(`[server] could not start http server on port: ${port}`);
        return;
      }
      console.log(`[server] running on port: ${port}`);
    });

    // Handling Uncaught Exception
    process.on('uncaughtException', (err) => {
      console.log(`Error: ${err.message}`);
      console.log(`[server] shutting down due to Uncaught Exception`);

      server.close(() => {
        process.exit(1);
      });
    });

    // Unhandled Promise Rejection
    process.on('unhandledRejection', (err) => {
      console.log(`Error: ${err.message}`);
      console.log(`[server] shutting down due to Unhandled Promise Rejection`);

      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.log(`[database]: could not connect due to [${err.message}]`);

    // Health Route
    app.use('/api/v1/health', (req, res, next) => {
      res.status(200).json({
        success: true,
        server: 'offline',
        message: 'server is down due to database connection error',
      });
    });

    app.use('*', (req, res, next) => {
      res.status(500).json({
        success: false,
        server: 'offline',
        message: '[server] offline due to database error',
      });
    });

    console.log(`[database]: could not connect due to [${err.message}]`);

    const server = app.listen(port, (err) => {
      if (err) {
        console.log(`[server] could not start http server on port: ${port}`);
        return;
      }
      console.log(`[server] running on port: ${port}`);
    });

    setTimeout(() => {
      server.close();
      connectToDatabase();
    }, 10000);
  }
};

// Starting Server
(async () => {
  if (process.env.SERVER_MAINTENANCE === 'true') {
    // Health Route
    app.use('/api/v1/health', (req, res, next) => {
      return res.status(200).json({
        success: false,
        server: 'maintenance',
        message: 'Server is under maintenance',
      });
    });

    app.use('*', (req, res, next) => {
      res.status(503).json({
        success: false,
        server: 'maintenance',
        message: '[server] offline for maintenance',
      });
    });

    app.listen(port, (err) => {
      if (err) {
        console.log(`[server] could not start http server on port: ${port}`);
        return;
      }
      console.log(`[server] running on port: ${port}`);
    });
  } else {
    connectToDatabase();
  }
})();
