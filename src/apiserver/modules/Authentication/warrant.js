import { models, UserType } from '../../models';

const User = models.User;

// ideas from https://github.com/rdegges/svcc-auth

/* eslint-disable no-param-reassign */

/* Stores user data in the session and sets related cookies
 *  - Store the user object as a req.user
 *  - Set a session cookie with the user object
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
const createUserSession = function createUserSession(req, res, user) {
  console.log('creating session');
  const cleanUser = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    userType: user.userType,
    validated: user.validated,
  };

  req.session.user = cleanUser;
  req.user = cleanUser;
  res.locals.user = cleanUser;
  res.cookie('snssl', 'y', { httpOnly: false }); // Does the user have a session.
};


/* Destroy a user session
 * Removes the session and related cookies.
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
 /* eslint-disable no-unused-vars */
const destroyUserSession = function destroyUserSession(req, res, user) {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('snssl');
    console.log('Destroyed user session');
    console.dir(res);
  }
};
/* eslint-enable no-unused-vars */

/**
 * A simple authentication middleware for Express.
 *
 * This middleware will load users from session data, and handle all user
 * proxying for convenience.
 * TODO: We're hitting the db every session. Store more data in session? Then, how to ban?
 */
const validateUserSession = function validateUserSession(req, res, next) {
  console.log('validating session');
  if (req.session && req.session.user) {
    User.findById(req.session.user.id).then((user) => {
      if (user) {
        if (user.userType === UserType.BANNED) {
          destroyUserSession(req, res, user);
          next();
        }
        createUserSession(req, res, user);
      }
      next();
    });
  } else {
    next();
  }
};

/* Authenticates a user with email and password.
 * Creates a session on valid authentication.
 */
const authenticateUser = function authenticateUser(req, res, body) {
  const email = body.email;
  const password = body.password;
  if (!email || !password) {
    const err = new Error('Email and password required.');
    throw err;
  }
  let foundUser = null;
  console.log(`Finding an account ${email} pass: ${password}`);
  return User.find({ where: { email: email } })
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
      console.log('Returning password Match');
      createUserSession(req, res, foundUser);
      return foundUser;
    });
};

/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be sent a 403.
 */
const requireLogin = function requireLogin() {
  return function areWeAuthenticated(req, res, next) {
    if (req && !req.user) {
      res.statusMessage = 'Requires login.'; // eslint-disable-line no-param-reassign
      res.status(403).end();
    } else {
      next();
    }
  };
};

/* eslint-enable no-param-reassign */
export {
  validateUserSession,
  createUserSession,
  destroyUserSession,
  authenticateUser,
  requireLogin,
};
