import { Router } from 'express';
import passport from 'passport';

const routes = new Router();

function signinUser(req, res, next) {
  passport.authenticate('local', (err, user) => { // eslint-disable-line consistent-return
    if (err || !user) {
      res.statusMessage = 'Could not log in with that email and password combination.'; // eslint-disable-line no-param-reassign
      res.status(422).end();
    }
    req.logIn(user, (error) => { // eslint-disable-line consistent-return
      if (error) {
        return next(error);
      }
      res.cookie('snssl', 'y', { httpOnly: false });

      // you can send a json response instead of redirecting the user
      res.status(201).json({
        success: true,
        message: 'Logged in',
        user: user,
      });
    });
  })(req, res, next);
}

routes.route('/sessions')
  .post(signinUser);

routes.route('/sessions')
  .delete(function logThemOut(req, res) {
    req.session.destroy();
    req.logout();
    res.clearCookie('snssl');
    res.status(204).end();
  });

/* Checks if a user is currently authenticated.
 * Technically, checks the cookie.
 */
routes.route('/sessions')
  .get(function isAuthenticated(req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(204).end();
    }
    res.status(403).end();
  });

export default routes;
