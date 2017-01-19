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
