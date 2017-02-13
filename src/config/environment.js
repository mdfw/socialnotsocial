import dotenv from 'dotenv';
import requireEnv from 'require-environment-variables';

/* 'As early as possible in your application, require and configure dotenv.'
 *   - https://www.npmjs.com/package/dotenv
 *
 * However, we aren't going to load these in production as it could lead to sloppy deploys.
 */
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log(`Environment: ${process.env.NODE_ENV} - loading DEV environment vars.`);
  dotenv.load();
} else if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  console.log('Environment: loading TEST environment vars.');
  dotenv.load({ path: './envTest' });
} else {
  console.log(`Environment: did NOT load environment variables from .env for ${process.env.NODE_ENV}. This is not a problem if you define your environment variables outside of the file system as you should.`);
}

/* If any of the environment variables(process.env.REDIS_URL) don't exist,
 *   the process exits with code 400.
 * https://github.com/bjoshuanoah/require-environment-variables
 */
requireEnv([
  'REDIS_URL',
  'DATABASE_URL',
  'MAIN_SERVER_PORT',
  'ACCOUNT_PEPPER_1',
  'ACCOUNT_ENCRYPT_CURRENT_PEPPER',
  'IDIER_WORKER_ID',
  'TOKEN_PEPPER_1',
  'TOKEN_ENCRYPT_CURRENT_PEPPER',
  'SESSION_SECRET',
]);
