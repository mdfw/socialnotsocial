import { Router } from 'express';
import passport from 'passport';

const routes = new Router();

function signinUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => { // eslint-disable-line consistent-return
    if (err || !user) {
      return res.status(400).send(info);
    }
    req.logIn(user, (error) => { // eslint-disable-line consistent-return
      if (error) {
        return next(error);
      }
      res.cookie('snssl', 'y', { httpOnly: false });

      // you can send a json response instead of redirecting the user
      res.status(200).json({
        success: true,
        message: 'Logged in',
        account: user,
      });
    });
  })(req, res, next);
}

routes.route('/login')
  .post(signinUser);

routes.route('/logout')
  .get(function logThemOut(req, res) {
    req.logout();
    res.clearCookie('snssl');
    res.status(200).json({
      success: true,
      message: 'Successfully logged out.',
    });
  });

/* Checks if a user is currently authenticated.
 * Technically, checks the cookie.
 */
routes.route('/authenticated')
  .get(function isAuthenticated(req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(204).end();
    }
    res.status(403).end();
  });

export default routes;
