import { Router } from 'express';
import {
  getPostsEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
} from './controller';
import { requireLogin } from '../Authentication/warrant';

const routes = new Router();
routes.get('/posts', requireLogin(), getPostsEndpoint);
routes.post('/posts', requireLogin(), addPostEndpoint);
routes.put('/posts/:postId', requireLogin(), updatePostEndpoint);
routes.delete('/posts/:postId', requireLogin(), removePostEndpoint);

export default routes;
