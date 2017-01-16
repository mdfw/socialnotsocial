import { isEmail, isEmpty } from 'validator';

const appraiseEmail = function appraiseEmail(emailAddress) {
  /* Is the email valid? Uses the validator library to test.
   */
  const messages = [];
  if (isEmpty(emailAddress)) {
    messages.push('Email address is required.');
  }
  if (!isEmpty(emailAddress) && !isEmail(this.email)) {
    messages.push('Email address does not appear to be valid.');
  }
  return messages;
};

const appraiseDisplayName = function appraiseDisplayName(displayName) {
  /* appraiseDisplayName tests for the validity of the displayName.
   *  Only checks if it's empty.
   */
  const messages = [];
  if (isEmpty(displayName)) {
    messages.push('Display name is required.');
  }
  return messages;
};

const appraisePassword = function appraisePassword(password) {
  /* Currently only checks on empty.
   *  TODO: add other checks for a valid password.
   */
  const messages = [];
  if (isEmpty(password)) {
    messages.push('Password is required.');
  }
  return messages;
};

const appraiseAccountId = function appraiseAccountId(accountId) {
  /* appraiseAccountId tests for the presense of an accountID.
   *  Only checks if it's empty.
   *  TODO: Check if the account actually exists.
   */
  const messages = [];
  if (isEmpty(accountId)) {
    messages.push('AccountId is required.');
  }
  return messages;
};

/* Validates multiple options. Pass in an object with one of the following:
 * email: {string} validates an email (or empty}
 * displayName; {string} checks for empty
 * password: {string} validates a password
 * accountId: {string} validates the accountId
 * @returns: an object (see validator object below)
 */
const appraiseThese = function appraiseThese(what) {
  const appraised = {
    success: true,  // Did all tests pass
    tested: [],  // Which tests where done? Check this to make sure things were passed in correctly.
    errors: {    // Error output from the sub-testers
      email: [],
      password: [],
      displayName: [],
      accountId: [],
    },
  };
  if ('email' in what) {
    appraised.tested.push('email');
    const messages = appraiseEmail(what.email);
    if (messages && messages.length > 0) {
      appraised.success = false;
      appraised.errors.email = messages;
    }
  }
  if ('password' in what) {
    appraised.tested.push('password');
    const messages = appraisePassword(what.password);
    if (messages && messages.length > 0) {
      appraised.success = false;
      appraised.errors.password = messages;
    }
  }
  if ('displayName' in what) {
    appraised.tested.push('displayName');
    const messages = appraiseDisplayName(what.displayName);
    if (messages && messages.length > 0) {
      appraised.success = false;
      appraised.errors.displayName = messages;
    }
  }
  if ('accountId' in what) {
    appraised.tested.push('accountId');
    const messages = appraiseAccountId(what.accountId);
    if (messages && messages.length > 0) {
      appraised.success = false;
      appraised.errors.accountId = messages;
    }
  }
};

export { appraiseThese, appraiseEmail, appraiseDisplayName, appraisePassword, appraiseAccountId };
