/* Based on here: https://github.com/jaredhanson/connect-ensure-login/blob/master/lib/ensureLoggedIn.js
 * Used under MIT license
 * I edited it to make it go along with my linter and easier for me to understand.
 * Original release notes:
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *
 * Examples:
 *
 *     app.get('/profile',
 *       ensureLoggedIn(),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn('/signin'),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
 *       function(req, res) { ... });
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
export default function ensureLoggedIn(options) {
  let unauthenticatedRedirectURL = '/login';
  if (typeof options === 'string') {
    unauthenticatedRedirectURL = options;
  } else if (options && options.redirectTo && options.redirectTo.length > 0) {
    unauthenticatedRedirectURL = options.redirectTo;
  }
  const allOptions = options || {};

  const setReturnTo = (allOptions.setReturnTo === undefined) ? true : options.setReturnTo;

  return function areWeAuthenticated(req, res, next) { // eslint-disable-line consistent-return
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url; // eslint-disable-line no-param-reassign
      }
      return res.redirect(unauthenticatedRedirectURL);
    }
    next();
  };
}
