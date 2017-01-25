import fetch from 'isomorphic-fetch';
import { submittingAccountInfo, receiveAccountInfo, receiveAccountError, submitAccountError } from './account';
import { registerFormClear } from './registerForm';

function checkFetchAPIStatus(response) {
  if (response.status === 201) {
    return response.body.account;
  } else if (response.status === 422) {
    const error = new Error(response.body.messages);
    error.response = response;
    throw error;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const fetchAccountAPI = function fetchAccountAPI() {
  return function fetchPageDispatch(dispatch) {
    const url = '/api/v1/account';
    return fetch(url, {
      credentials: 'same-origin',
    })
    .then(checkFetchAPIStatus)
    .then(function returnAccountData(account) {
      return dispatch(
        receiveAccountInfo(account),
      );
    })
    .catch(function receiveError(error) {
      return dispatch(
        receiveAccountError(error),
      );
    });
  };
};


/* Check that we did not receive an error from api server
 * Returns server error.statusText on non-201 status
 * Returns the server response object on 201 status
 */
function checkAddAccountReturn(response) {
  if (response.status === 201) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/* If we have valid new account data, dispatch it to the store.
 * Throw error on failure.
 * TODO: This seems fragile - is there a way to have server and
 *  this have agreement on what to expect?
 */
function dispatchNewAccountData(dispatch, data) {
  const account = data.account;
  if (!account.displayName ||
    account.displayName.length === 0 ||
    !account.email ||
    account.email.length === 0 ||
    !account.accountId ||
    account.accountId.length === 0
  ) {
    throw new Error('Invalid account information returned.');
  }
  return dispatch(
    receiveAccountInfo(account),
  );
}

/* Clears the new account data from the store
  */
function dispatchNewAccountFormClear(dispatch) {
  return dispatch(
    registerFormClear(),
  );
}
/* The heavy lifting work of adding an account.
 * @param {string} displayName
 * @param {string} displayName
 * @param {string} displayName
 * Calls to the api endpoint to create an account, parses it,
 *   places the account info in the store and clears the form.
 */
const addAccountAPI = function addAccountAPI(displayName, email, password) {
  return function fetchPageDispatch(dispatch) {
    console.log(`AccountAPI: Adding account: dn: ${displayName} em: ${email} ps: ${password}`);
    if (!displayName || displayName.length === 0 ||
      !email || email.length === 0 ||
      !password || password.length === 0
      ) {
      throw new Error('Missing items');
    }
    // Set the submitting flag
    dispatch(submittingAccountInfo());
    fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        displayName: displayName,
        email: email,
        password: password,
      }),
    })
    .then(checkAddAccountReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function addToStore(data) {
      return dispatchNewAccountData(dispatch, data);
    })
    .then(dispatchNewAccountFormClear(dispatch))
    .catch(function submitError(error) {
      return dispatch(
        submitAccountError(error),
      );
    });
  };
};

export { fetchAccountAPI, addAccountAPI };
