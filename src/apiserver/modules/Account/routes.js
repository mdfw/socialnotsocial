import { Router } from 'express';
import { addAccountEndpoint } from './controller';

const routes = new Router();

routes.route('/register')
  .post(addAccountEndpoint)
  .get(function signupGetFail(req, res) {
    res.status(405).end('Get is not supported for this endpoint');
  });

export default routes;
