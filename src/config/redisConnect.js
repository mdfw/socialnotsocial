import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL;

/* Connect to redis */
const redisClient = redis.createClient(REDIS_URL);

redisClient.on('error', function redisErrorReport(err) {
  console.log(`Redis connection error ${err}`);
});

export default redisClient;
