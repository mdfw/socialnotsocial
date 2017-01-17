import Account from './model';
import { appraiseThese } from '../../../shared/helpers/appraise';

/* addAccount: Adds an account
 * A new account requires an email, password and displayName.
 * Checks for validity of these fields uing the appraiser.
 * @param {string} email - email address for new account.
 * @param {string} password - password for the account.
 * @param {string} displayName - The display name for pages shown for the account.
 * @returns: {object} - see status object
 */
const addAccount = (email, password, displayName) => {
  const status = {
    errors: {},
    account: null,
  };

  return new Promise(function addAccountPromise(resolve, reject) {
    /* Validate the fields */
    const fieldsValid = appraiseThese({
      email: email,
      password: password,
      displayName: displayName,
    });
    if (!fieldsValid.success) {
      status.errors = fieldsValid.errors;
      reject(status);
    }

    // Search the database for a user object with the submitted email.
    Account.findOne({ email: email })
      .then((foundAccount) => {
        if (foundAccount) {
          status.errors.email = 'Email is already in use.';
          reject(status);
        }

        // Create a new instance of the account model.
        const newAccount = new Account({ email, password, displayName });
        // Save the new account object to the database.
        newAccount.save()
          .then((savedAccountDoc) => {
            status.account = savedAccountDoc;
            resolve(status);
          })
          .catch((err) => {
            let error;
            if (err.code === 11000) error = 'Email is already in use.';
            status.errors.email = error;
            reject(status);
          });
      })
      .catch((error) => {
        console.log('Error occurred during find on account creation.');
        console.dir(error);
        status.errors.internal = 'Internal error occurred';
        reject(status);
      });
  });
};

/* Updates an account
 * Not currently implemented
 */
const updateAccount = () => { // eslint-disable-line arrow-body-style
  return new Promise(function updateAccountPromise(resolve) {
    resolve('Not implemented');
  });
};

/* Find an account
 * @param {string} accountId - the identifier for the account.
 * @returns {object} - the exists object below with the account object if found.
 */
const findAccount = (accountId) => {
  /* exists is the return object */
  const exists = {
    found: false,
    error: null,
    account: null,
  };

  return new Promise(function addAccountPromise(resolve, reject) {
    /* Validate the fields */
    const fieldsValid = appraiseThese({
      accountId: accountId,
    });
    if (!fieldsValid.success) {
      exists.found = false;
      exists.error = new Error('Invalid AccountId provided');
      reject(exists);
    }

    // Search the database for a account object with the objectId.
    Account.findOne({ accountId: accountId })
      .then((foundAccount) => {
        if (foundAccount) {
          exists.found = true;
          resolve(exists);
        } else {
          exists.found = false;
          reject(exists);
        }
      })
      .catch((error) => {
        console.log('Error occurred during find on account creation.');
        console.dir(error);
        exists.error = new Error('Internal error occurred');
        reject(exists);
      });
  });
};

export { addAccount, updateAccount, findAccount };
