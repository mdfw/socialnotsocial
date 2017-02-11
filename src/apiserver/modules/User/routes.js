import { Router } from 'express';
import { ensureLoggedIn } from '../Authentication';
import {
  addUserEndpoint,
  getUserInfoEndpoint,
  updateUserEndpoint,
  updatePasswordEndpoint,
} from './controller';

const routes = new Router();

routes.route('/users')
  .post(addUserEndpoint);

routes.get('/users', ensureLoggedIn(), getUserInfoEndpoint);
routes.put('/users', ensureLoggedIn(), updateUserEndpoint);
routes.put('/password', ensureLoggedIn(), updatePasswordEndpoint);

export default routes;
