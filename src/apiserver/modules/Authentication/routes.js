/* Sessions endpoint creates sessions
 *  These would be equivalent to login/logout
 */
import { Router } from 'express';
import { authenticateUser, destroyUserSession } from './warrant';

const routes = new Router();

/* Calls authenticateUser to log in a user */
function signinUser(req, res) {
  const body = req.body;
  authenticateUser(req, res, body)
  .then((user) => {
    res.status(201).json({
      success: true,
      message: 'Logged in',
      user: user,
    });
  })
  .catch((err) => {
    console.log(err);
    res.statusMessage = 'Could not log in with that email and password combination.'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  });
}

routes.route('/sessions')
  .post(signinUser);


/* Clears the session info, effectively logging out a user */
routes.route('/sessions')
  .delete(function logThemOut(req, res) {
    destroyUserSession(req, res);
    res.status(204).end();
  });

/* Checks if a user is currently authenticated.
 */
routes.route('/sessions')
  .get(function isAuthenticated(req, res) {
    if (req.user) {
      res.status(204).end();
      return;
    }
    res.status(403).end();
  });

export default routes;
