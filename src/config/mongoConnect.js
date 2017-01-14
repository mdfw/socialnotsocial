import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = global.Promise;

/* Connect to mongo */
mongoose.connect(MONGO_URL);
mongoose.connection
  .once('open', () => console.log(`Connected to MongoDb: running on ${MONGO_URL}`))
  .on('error', err => console.warn('Warning', err));
