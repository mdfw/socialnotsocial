import { Router } from 'express';
import { addAccountEndpoint, getAccountInfoEndpoint } from './controller';
import { ensureLoggedIn } from '../Authentication';

const routes = new Router();

routes.route('/account')
  .post(addAccountEndpoint);

routes.get('/account', ensureLoggedIn(), getAccountInfoEndpoint);

export default routes;
