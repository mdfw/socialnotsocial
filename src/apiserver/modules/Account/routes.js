import { Router } from 'express';
import { addAccountRequest } from './controller';

const routes = new Router();

routes.route('/signup')
  .post(addAccountRequest)
  .get(function signupGetFail(req, res) {
    res.status(405).end('Get is not supported for this endpoint');
  });


export default routes;
