import { Router } from 'express';
import { addRecipientRequest } from './controller';

const routes = new Router();

routes.route('/recipients')
  .post(addRecipientRequest)
  .get(function signupGetFail(req, res) {
    res.status(405).end('Get is not supported for recipients endpoint');
  });

export default routes;
