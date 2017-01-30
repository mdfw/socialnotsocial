import dotenv from 'dotenv';
import requireEnv from 'require-environment-variables';

/* 'As early as possible in your application, require and configure dotenv.'
 *   - https://www.npmjs.com/package/dotenv
 *
 * However, we aren't going to load these in production as it could lead to sloppy deploys.
 */
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  dotenv.load();
} else {
  dotenv.load();
}

/* If any of the environment variables(process.env.REDIS_URL) don't exist,
 *   the process exits with code 400.
 * https://github.com/bjoshuanoah/require-environment-variables
 */
requireEnv([
  'REDIS_URL',
  'MONGODB_URI',
  'API_SERVER_PORT',
  'MAIN_SERVER_PORT',
  'ACCOUNT_PEPPER_1',
  'ACCOUNT_ENCRYPT_CURRENT_PEPPER',
  'IDIER_WORKER_ID',
]);
