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
      path: './logs/mongodb.log', // Keep logs in this path
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

// Connect to MongoDB
mongoose
  .connect(process.env.URI, config)
  .then(() => {
    console.log('Connection to MongoDB successful!');
  })
  .catch((err) => {
    console.log('Connection to MongoDB failed:', err);
  });

// Event handlers for successful and failed connections
db.on('open', () => {
  console.log('Connection to MongoDB successful!');
}).on('error', (err) => {
  console.log('Connection to MongoDB failed:', err);
});

export default db;
