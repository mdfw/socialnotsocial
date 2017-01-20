import { Router } from 'express';
import {
  getPostsEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
} from './controller';
import { ensureLoggedIn } from '../Authentication';

const routes = new Router();
routes.get('/posts', ensureLoggedIn(), getPostsEndpoint);
routes.post('/posts', ensureLoggedIn(), addPostEndpoint);
routes.put('/posts/:postId', ensureLoggedIn(), updatePostEndpoint);
routes.delete('/posts/:postId', ensureLoggedIn(), removePostEndpoint);

export default routes;
