import { Router } from 'express';
import { getRecipientsEndpoint, addRecipientEndpoint, updateRecipientEndpoint } from './controller';

const routes = new Router();

routes.route('/recipients/')
  .post(addRecipientEndpoint)
  .get(getRecipientsEndpoint);

routes.route('/recipients/:recipientId')
  .put(updateRecipientEndpoint);
  // .delete(removeRecipientEndpoint);

export default routes;
