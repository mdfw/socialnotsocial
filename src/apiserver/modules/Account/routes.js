import { Router } from 'express';
import * as AccountController from './controller';

const routes = new Router();

routes.route('/signup')
  .post(AccountController.signup)
  .get(function (req, res) {
    res.send('Get a random book')
  })

export default routes;