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

export default routes;
