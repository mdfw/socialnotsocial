import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};

mongoose.Promise = global.Promise;

/* Connect to mongo */
mongoose.connect(MONGODB_URI, options);
mongoose.connection
  .once('open', () => console.log(`Connected to MongoDb: running on ${MONGODB_URI}`))
  .on('error', err => console.warn('Warning', err));

export default mongoose;
