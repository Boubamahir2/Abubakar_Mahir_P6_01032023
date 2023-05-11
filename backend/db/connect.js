import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bunyan from 'bunyan';

dotenv.config();

// Store connection object
const db = mongoose.connection;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // ssl: true, // Make sure you have the necessary SSL certificate configurations
};

// The logging configuration is not strictly necessary for the basic functioning of your code. It is an optional feature that provides benefits in terms of monitoring and troubleshooting your MongoDB operations.

// By configuring logging, you can capture and analyze important information about the queries, errors, and other events related to your MongoDB interactions. It helps you understand what is happening in the database, diagnose issues, and track the flow of operations.

// Logging can be especially useful in production environments or when debugging complex scenarios. It allows you to trace the execution of queries, inspect the data being passed, and identify any errors or performance bottlenecks.

// Logging configuration
const log = bunyan.createLogger({
  name: 'MongoDB Driver',
  serializers: {
    dbQuery: serializer,
  },
  streams: [
    {
      stream: process.stdout,
      level: 'info',
    },
    {
      stream: process.stdout,
      level: 'debug',
    },
    {
      stream: process.stderr,
      level: 'error',
    },
    {
      type: 'rotating-file',
      path: './backend/logs/mo', // Keep logs in this path
      period: '1d', // Daily rotation
      count: 3, // Keep 3 backup copies
    },
  ],
});

// Serializer function to convert data to JSON objects
function serializer(data) {
  let query = JSON.stringify(data.query);
  let options = JSON.stringify(data.options || {});
  return `db.${data.coll}.${data.method}(${query}, ${options});`;
}

// Mongoose debug mode to log queries
mongoose.set('debug', function (coll, method, query, doc, options) {
  let set = {
    coll: coll,
    method: method,
    query: query,
    doc: doc,
    options: options,
  };

  log.info({
    dbQuery: set,
  });
});

mongoose.set('strictQuery', false);

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, config);
    console.log('Connection to MongoDB successful!');
  } catch (err) {
    console.log('Connection to MongoDB failed:', err);
    throw err; // Rethrow the error to be caught elsewhere if needed
  }
};

// Event handlers for successful and failed connections
db.on('open', () => {
  console.log('Connection to MongoDB successful!');
}).on('error', (err) => {
  console.log('Connection to MongoDB failed:', err);
});

// Export the connectToDatabase function for external use
export default connectToDatabase;
