import { isEmail, isEmpty } from 'validator';
import owasp from 'owasp-password-strength-test';

/* Is the email valid? Uses the validator library to test.
 */
const appraiseEmail = function appraiseEmail(emailAddress) {
  const messages = [];
  if (isEmpty(emailAddress)) {
    messages.push('Email address is required.');
  }
  if (!isEmpty(emailAddress) && !isEmail(emailAddress)) {
    messages.push('Email address does not appear to be valid.');
  }
  return messages;
};

/* Test for the validity of the displayName.
 *  Currently only checks if it's empty.
 */
const appraiseDisplayName = function appraiseDisplayName(displayName) {
  const messages = [];
  if (isEmpty(displayName)) {
    messages.push('Display name is required.');
  }
  return messages;
};

/* Tests a password.
 * Must be valid and pass the owasp validation tests.
 */
const appraisePassword = function appraisePassword(password) {
  let messages = [];
  if (isEmpty(password)) {
    messages.push('Password is required.');
  } else {
    const owaspResults = owasp.test(password);
    if (!owaspResults.strong) {
      messages = messages.concat(owaspResults.errors);
    }
  }
  return messages;
};

const appraisePasswordErrors = {
  minLength: 0,
  maxLength: 1,
  repeating: 2,
  needLowercase: 3,
  needUppercase: 4,
  needNumber: 5,
  needCharacter: 6,
};

/* A wrapper for awasp tests that returns this
 * {
 *   errors              : [],
 *   failedTests         : [],
 *   requiredTestErrors  : [],
 *   optionalTestErrors  : [],
 *   passedTests         : [ 0, 1, 2, 3, 4, 5, 6 ],
 *   isPassphrase        : false,
 *   strong              : true,
 *   optionalTestsPassed : 4
 * }
 */
const appraisePasswordExtra = function appraisePasswordExtra(password) {
  return owasp.test(password);
};

/* Tests for the presense of an accountID.
 *  Only checks if it's empty.
 *  TODO: Check if the account actually exists.
 */
const appraiseAccountId = function appraiseAccountId(accountId) {
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
    errors: {},  // Error output from the sub-testers as objects.
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
  return appraised;
};

/* Tests for the presense of a post message.
 *  Only checks if it's empty.
 *  Here for future functionality.
 */
const appraisePostMessage = function appraisePostMessage(postMessage) {
  const messages = [];
  if (!postMessage || isEmpty(postMessage)) {
    messages.push('A message is required.');
  }
  return messages;
};

/* Tests for the presense of a post subject.
 *  Runs no checks.
 *  Here for future functionality.
 */
/* eslint-disable no-unused-vars */
const appraisePostSubject = function appraisePostSubject(postSubject) {
  return [];
};
/* eslint-enable no-unused-vars */

export {
  appraiseThese,
  appraiseEmail,
  appraiseDisplayName,
  appraisePassword,
  appraisePasswordExtra,
  appraisePasswordErrors,
  appraiseAccountId,
  appraisePostSubject,
  appraisePostMessage,
};
