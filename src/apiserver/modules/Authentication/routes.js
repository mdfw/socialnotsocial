import { Router } from 'express';
import passport from 'passport';

const routes = new Router();

routes.route('/login')
  .post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    },
    ),
  );

routes.route('/logout')
  .get(function logThemOut(req, res) {
    req.logout();
    res.status(201).json({
      success: true,
      message: 'Successfully logged out.',
    });
  });

/* Checks if a user is currently authenticated.
 * Thecnically, checks the cookie.
 */
routes.route('/authenticated')
  .get(function isAuthenticated(req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(204).end();
    }
    res.status(403).end();
  });

export default routes;
