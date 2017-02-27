import { Router } from 'express';
import { requireLogin } from '../Authentication/warrant';
import {
  getApprisalsEndpoint,
  addApprisalEndpoint,
  updateApprisalEndpoint,
  removeApprisalEndpoint,
} from './controller';

const routes = new Router();
routes.get('/apprisals', requireLogin(), getApprisalsEndpoint);
routes.post('/apprisals', requireLogin(), addApprisalEndpoint);
routes.put('/apprisals/:recipientId', requireLogin(), updateApprisalEndpoint);
routes.delete('/apprisals/:recipientId', requireLogin(), removeApprisalEndpoint);

export default routes;
