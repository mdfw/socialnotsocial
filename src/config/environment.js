import dotenv from 'dotenv';

/* 'As early as possible in your application, require and configure dotenv.'
 *   - https://www.npmjs.com/package/dotenv
 */
dotenv.config();

// Bring in Envvars from .env.
const envVars = [
  'REDIS_URL',
  'MONGODB_URI',
  'NODE_ENV',
  'API_SERVER_PORT',
  'MAIN_SERVER_PORT',
  'ACCOUNT_PEPPER_1',
  'ACCOUNT_ENCRYPT_CURRENT_PEPPER',
  'IDIER_WORKER_ID',
];

// Check that Envvars are set.
envVars.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Environment variable ${env} not set.`);
  }
});
