import { Strategy } from 'passport-local';
import passport from 'passport';
import Account from '../Account/model';

/* Configure the local strategy for use by Passport.
 *
 * The local strategy require a `verify` function which receives the credentials
 * (`username` and `password`) submitted by the user.  The function must verify
 * that the password is correct and then invoke `callback` with a user object, which
 * will be set at `req.user` in route handlers after authentication.
 */
passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function snsLocalStrategy(email, password, callback) {
    let foundAccount = null;
    Account.findOneByEmail(email)
      .then(function comparePass(theAccount) {
        foundAccount = theAccount;
        return theAccount.comparePassword(password);
      })
      .then(function returnAccount(passwordsMatched) {
        if (!passwordsMatched) {
          throw new Error('Could not verify account');
        }
        return foundAccount;
      })
      .then(function returnAccount(accountToReturn) {
        callback(null, accountToReturn);
      })
      .catch(function catchAuthFailure(err) {
        console.log(`Passport authentication failed: Unknown error: ${err}`);
        return callback(null, false, { message: 'Could not authenticate account' });
      });
  }));


/* Configure Passport authenticated session persistence.
 *
 * In order to restore authentication state across HTTP requests, Passport needs
 * to serialize users into and deserialize users out of the session.  The
 * typical implementation of this is as simple as supplying the user ID when
 * serializing, and querying the user record by ID from the database when
 * deserializing.
 */
passport.serializeUser(function serializeAccount(account, callback) {
  console.log('Serializing user. This id: ', account.accountId);
  callback(null, account.accountId);
});

passport.deserializeUser(function deserializeAccount(accountId, callback) {
  console.log(`Deserializing user based on ${accountId}`);
  Account.findOneAccount(accountId)
  .then(function determineAction(theAccount) {
    return callback(null, theAccount);
  })
  .catch(function noFind(err) {
    return callback(err);
  });
});


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
const ensureLoggedIn = function ensureLoggedIn(options) {
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
};

export { ensureLoggedIn }; // eslint-disable-line import/prefer-default-export
