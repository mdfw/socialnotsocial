import dotenv from 'dotenv';

/* 'As early as possible in your application, require and configure dotenv.'
 *   - https://www.npmjs.com/package/dotenv
 */
dotenv.config();

// Bring in Envvars from .env.
const envVars = [
  'REDIS_URL',
  'MONGO_URL',
  'NODE_ENV',
  'API_SERVER_PORT',
  'MAIN_SERVER_PORT',
  'ACCOUNT_ENCRYPTION_PEPPER',
  'IDIER_WORKER_ID',
];

// Check that Envvars are set.
envVars.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Environment variable ${env} not set.`);
  }
});
