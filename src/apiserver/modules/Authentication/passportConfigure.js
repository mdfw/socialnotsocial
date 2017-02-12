import { Strategy } from 'passport-local';
import passport from 'passport';
import models from '../../models';

const User = models.User;

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
    let foundUser = null;
    console.log(`Finding an account ${email} pass: ${password}`);
    User.find({ where: { email: email } })
      .then(function comparePass(theUser) {
        foundUser = theUser;
        console.log('found user');
        console.dir(theUser);
        return theUser.comparePassword(password);
      })
      .then(function returnAccount(passwordsMatched) {
        if (!passwordsMatched) {
          throw new Error('Could not verify account');
        }
        console.log('Returning password Match')
        return foundUser;
      })
      .then(function returnAccount(userToReturn) {
        console.log('returning user');
        callback(null, userToReturn);
      })
      .catch(function catchAuthFailure(err) {
        console.log(`Passport authentication failed: Unknown error: ${err}`);
        return callback(null, false, { message: 'Could not authenticate user' });
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
  console.log('Serializing user');
  console.dir(account);
  callback(null, account.id);
});

passport.deserializeUser(function deserializeAccount(accountId, callback) {
  User.findById(accountId)
  .then(function determineAction(theAccount) {
    return callback(null, theAccount);
  })
  .catch(function noFind(err) {
    return callback(err);
  });
});
