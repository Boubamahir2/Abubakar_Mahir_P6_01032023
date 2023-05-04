
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { runApp } from './app.js';

// app
const app = runApp();

dotenv.config();

/* MONGOOSE SETUP */
const port = process.env.PORT || 6001;

//database
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// server
const startServer = async () => {
  try {
    // Connect to MongoDB
    console.log('[database]: connecting to MongoDB...');
    await client.connect();

    // Start HTTP server
    app.listen(port, () => {
      console.log(`[server] running on port: ${port}`);
    });
  } catch (err) {
    console.log(`[database]: could not connect due to [${err.message}]`);
  }
};

// Check if the server is in maintenance mode
if (process.env.SERVER_MAINTENANCE === 'true') {
  const app = express();

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
  // Start server
  startServer();
}

