
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { runApp ,closeApp} from './app.js';

// app
const app = runApp();

dotenv.config();

/* MONGOOSE SETUP */
const port = process.env.PORT || 6001;

//database
// const uri = process.env.MONGO_URL;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // server
// const startServer = async () => {
//   try {
//     // Connect to MongoDB
//     console.log('[database]: connecting to MongoDB...');
//     await client
//       .connect()
//       .then(() => {
//         console.log('MongoDB connected successfully');
//       })
//       .catch((err) => {
//         console.error('MongoDB connection failed:', err);
//       });

//     // Start HTTP server
//     app.listen(port, () => {
//       console.log(`[server] running on port: ${port}`);
//     });
//   } catch (err) {
//     console.log(`[database]: could not connect due to [${err.message}]`);
//   }
// };

// // Check if the server is in maintenance mode
// if (process.env.SERVER_MAINTENANCE === 'true') {
//   const app = express();

//   // Health Route
//   app.use('/api/v1/health', (req, res, next) => {
//     return res.status(200).json({
//       success: false,
//       server: 'maintenance',
//       message: 'Server is under maintenance',
//     });
//   });

//   app.use('*', (req, res, next) => {
//     res.status(503).json({
//       success: false,
//       server: 'maintenance',
//       message: '[server] offline for maintenance',
//     });
//   });

//   app.listen(port, (err) => {
//     if (err) {
//       console.log(`[server] could not start http server on port: ${port}`);
//       return;
//     }
//     console.log(`[server] running on port: ${port}`);
//   });
// } else {
//   // Start server
//   startServer();
// }


// Connecting to DB
const connectToDatabase = function () {
  console.log('[database]: connecting to MongoDB...');
  mongoose.set('strictQuery', true).connect(
    process.env.MONGO_URL,
    function (err) {
      if (err) {
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
            console.log(
              `[server] could not start http server on port: ${port}`
            );
            return;
          }
          console.log(`[server] running on port: ${port}`);
        });

        setTimeout(() => {
          server.close();
          connectToDatabase();
        }, 10000);
        return;
      } else {
        console.log(`[database]: connected successfully to MongoDB`);

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
            console.log(
              `[server] could not start http server on port: ${port}`
            );
            return;
          }
          console.log(`[server] running on port: ${port}`);
        });

        // Init Web Socket
        // initWebSocket(server);

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
          console.log(
            `[server] shutting down due to Unhandled Promise Rejection`
          );

          server.close(() => {
            process.exit(1);
          });
        });
      }
    }
  );
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


