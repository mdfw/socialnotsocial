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
const authUserSession = function authUserSession(req, res, next) {
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


/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be sent a 403.
 */
const requireLogin = function requireLogin(req, res, next) {
  if (!req.user) {
    res.statusMessage = 'Requires login.'; // eslint-disable-line no-param-reassign
    res.status(403).end();
  } else {
    next();
  }
};

/* eslint-enable no-param-reassign */
export { authUserSession, createUserSession, destroyUserSession, requireLogin };
