import { Router } from 'express';
import { requireLogin } from '../Authentication/warrant';
import {
  getRecipientsEndpoint,
  addRecipientEndpoint,
  updateRecipientEndpoint,
  removeRecipientEndpoint,
} from './controller';

const routes = new Router();
routes.get('/recipients', requireLogin(), getRecipientsEndpoint);
routes.post('/recipients', requireLogin(), addRecipientEndpoint);
routes.put('/recipients/:recipientId', requireLogin(), updateRecipientEndpoint);
routes.delete('/recipients/:recipientId', requireLogin(), removeRecipientEndpoint);

export default routes;
