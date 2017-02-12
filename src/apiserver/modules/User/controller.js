import { createUserSession, destroyUserSession } from '../Authentication/warrant';

const models = require('../../models');

const User = models.User;

/* Returns either the current user's id or, if onBehalfOfId is passed in
 *  to the body, it will verify if the current user can act on behalf of the passed
 *  in id and return that.
 *  @param {object} req - the request object that has a user attached
 *  @returns {string} id - a user id to use in searches.
 *   TODO: need to move it to it's own module since we're duplicating it in every controller.
 */
const activeUsertId = function getUser(req) {
  const currentUser = req.user;
  const onBehalfOfId = req.body.onBehalfOfId;
  if (onBehalfOfId && onBehalfOfId.length > 0) {
    if (currentUser && currentUser.canActOnBehalfOf(onBehalfOfId)) {
      return onBehalfOfId;
    }
  }
  if (req.user && req.user.id) {
    return req.user.id;
  }
  return null;
};

/* Adds an user to the Users database based on the fields passed in.
 * Params needed in body:
 *   @param {string} email - the email address
 *   @param {string} password - the user's password. Must pass owasp tests.
 *   @param {string} displayName - the name to display on the user's page.
 */
const addUserEndpoint = (req, res) => {
  const { email, password, displayName } = req.body;
  const newUser = User.build({
    email: email,
    displayName: displayName,
  });
  newUser.setPassword(password)
    .then(() => { // eslint-disable-line arrow-body-style
      return newUser.save();
    })
    .then((createdUser) => {
      console.log('Created User');
      createUserSession(req, res, createdUser);
      console.log('Finished login');
      const cleanUser = createdUser.toJSON();
      res.status(201).json({
        success: true,
        message: 'Successfully Registered',
        user: cleanUser,
      });
    })
    .catch((err) => {
      destroyUserSession(req, res);
      console.log(err);
      console.dir(err);
      // TODO: this only works on mongoose. Have to dig into the err object to see where to pick up.
      if (err.code === 11000) {
        res.statusMessage = 'User with that email already exists'; // eslint-disable-line no-param-reassign
        res.status(409).end();
        return;
      }
      let errorMessage = 'User could not be created.';
      if (err.message) {
        errorMessage = err.message.replace(/(\r\n|\n|\r)/gm, ' ');
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      // TODO: Return errors better. The err object has an errors array that could be parsed.
      res.status(422).send(JSON.stringify({ errors: err.message }));
    });
};

/* Get user info for id.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The user's id to act on behalf of if current user
 *      can act on behalf of it.
 *  @param {number} id of user - Will be pulled from req.user.
 *  Uses activeUsertId() to get the search parameters.
 */
const getUserInfoEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = activeUsertId(req);
  if (!userId) {
    return res.status(422).json({ success: false, message: 'Not logged in.' });
  }
  User.findById(userId)
    .then((item) => {
      const cleanedItem = item.toJSON();
      res.status(201).json({
        success: true,
        user: cleanedItem,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Update non-password information on user.
  */
const updateUserEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = activeUsertId(req);
  if (!userId) {
    return res.status(422).json({ success: false, message: 'Not logged in.' });
  }
  const { email, displayName } = req.body;
  User.findById(userId)
    .then((item) => {
      const foundUser = item;
      foundUser.email = email;
      foundUser.displayName = displayName;
      return foundUser.save();
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Update password endpoint
 * Requires old and new password.
 * First validates old password then updates to the new password.
 */
const updatePasswordEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = activeUsertId(req);
  if (!userId) {
    return res.status(422).json({ success: false, message: 'Not logged in.' });
  }
  const { oldPassword, newPassword } = req.body;
  let foundUser = null;
  User.findById(userId)
    .then(function comparePass(theUser) {
      foundUser = theUser;
      return theUser.comparePassword(oldPassword);
    })
    .then(function wasPasswordValid(passwordsMatched) {
      if (!passwordsMatched) {
        throw new Error('Could not verify user');
      }
      return foundUser;
    })
    .then(function updatePass() {
      return foundUser.setPassword(newPassword);
    })
    .then(function saveUser() {
      return foundUser.save();
    })
    .then(function returnCompleted() {
      res.status(200).end();
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

export {
  addUserEndpoint,
  getUserInfoEndpoint,
  updateUserEndpoint,
  updatePasswordEndpoint,
};

