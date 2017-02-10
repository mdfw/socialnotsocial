import { Router } from 'express';
import { ensureLoggedIn } from '../Authentication';
import {
  addUserEndpoint,
  getUserInfoEndpoint,
  updateUserEndpoint,
  updatePasswordEndpoint
} from './controller';
 
const routes = new Router();

routes.route('/user')
  .post(addUserEndpoint);
  
routes.get('/user', ensureLoggedIn(), getUserInfoEndpoint);
routes.put('/user', ensureLoggedIn(), updateUserEndpoint);
routes.put('/password', ensureLoggedIn(), updatePasswordEndpoint);

export default routes;
