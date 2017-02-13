import { Router } from 'express';
import { requireLogin } from '../Authentication/warrant';
import {
  addUserEndpoint,
  getUserInfoEndpoint,
  updateUserEndpoint,
  updatePasswordEndpoint,
} from './controller';

const routes = new Router();

routes.route('/users')
  .post(addUserEndpoint);

routes.get('/users', requireLogin(), getUserInfoEndpoint);
routes.put('/users', requireLogin(), updateUserEndpoint);
routes.put('/passwords', requireLogin(), updatePasswordEndpoint);

export default routes;
