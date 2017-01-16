import { Router } from 'express';
import { addAccountEndpoint } from './apiController';

const routes = new Router();

routes.route('/signup')
  .post(addAccountEndpoint)
  .get(function signupGetFail(req, res) {
    res.status(405).end('Get is not supported for this endpoint');
  });

export default routes;
