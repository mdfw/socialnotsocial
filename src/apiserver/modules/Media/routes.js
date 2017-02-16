import { Router } from 'express';
import { requireLogin } from '../Authentication/warrant';
import {
  getMediaEndpoint,
  addMediumEndpoint,
  updateMediumEndpoint,
  removeMediumEndpoint,
} from './controller';

const routes = new Router();
routes.get('/media', requireLogin(), getMediaEndpoint);
routes.post('/media', requireLogin(), addMediumEndpoint);
routes.put('/media/:mediaId', requireLogin(), updateMediumEndpoint);
routes.delete('/media/:mediaId', requireLogin(), removeMediumEndpoint);

export default routes;
