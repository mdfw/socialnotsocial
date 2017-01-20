import { Router } from 'express';
import { getRecipientsEndpoint, addRecipientEndpoint, updateRecipientEndpoint, removeRecipientEndpoint } from './controller';
import { ensureLoggedIn } from '../Authentication';

const routes = new Router();
routes.get('/recipients', ensureLoggedIn(), getRecipientsEndpoint);
routes.post('/recipients', ensureLoggedIn(), addRecipientEndpoint);
routes.put('/recipients/:recipientId', ensureLoggedIn(), updateRecipientEndpoint);
routes.delete('/recipients/:recipientId', ensureLoggedIn(), removeRecipientEndpoint);

export default routes;
