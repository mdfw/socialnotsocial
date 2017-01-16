import { Router } from 'express';
import { getRecipientsEndpoint, addRecipientEndpoint, updateRecipient } from './apiController';

const routes = new Router();

routes.route('/recipients/:ownerAccountId')
  .post(addRecipientEndpoint)
  .get(getRecipientsEndpoint);

export default routes;
