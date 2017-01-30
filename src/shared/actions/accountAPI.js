import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import {
  submittingAccountInfo,
  receiveAccountInfo,
  receiveAccountError,
  submitAccountError,
  requestLogin,
  loginError,
  clearAccountInfo,
} from './account';
import { formClear, REG_FORM_NAME, LOGIN_FORM_NAME } from './forms';


/* If we have valid new account data, dispatch it to the store.
 * Throw error on failure.
 * TODO: This seems fragile - is there a way to have server and
 *  this have agreement on what to expect?
 */
function dispatchAccountData(dispatch, data) {
  console.log('dispatchAccountData:');
  console.dir(data);

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

/* Check that we did not receive an error from api server
 * Returns server error.statusText on non-201 status
 * Returns the server response object on 201 status
 */
function checkAccountReturn(response) {
  if (response.status === 201 || response.status === 200) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// -------- //
// FETCHING //
// -------- //
const fetchAccountAPI = function fetchAccountAPI() {
  return function fetchPageDispatch(dispatch) {
    const url = '/api/v1/account';
    return fetch(url, {
      credentials: 'same-origin',
    })
    .then(checkAccountReturn)
    .then(function processJsonResponse(response) {
      return response.json();
    })
    .then(function addToStore(data) {
      return dispatchAccountData(dispatch, data);
    })
    .then(function goHome() {
      return dispatch(
        push('/'),
      );
    })
    .catch(function receiveError(error) {
      return dispatch(
        receiveAccountError(error),
      );
    });
  };
};


// ----- //
// LOGIN //
// ----- //

/* Clears the login data from the store
  */
function dispatchLoginFormClear(dispatch) {
  return dispatch(
    formClear(LOGIN_FORM_NAME),
  );
}
/* The heavy lifting work of logging in an account.
 * @param {string} email
 * @param {string} password
 * Calls to the api endpoint to log in, parses it,
 *   places the account info in the store and clears the login form.
 */
const loginAccountAPI = function loginAccountAPI(email, password) {
  return function fetchPageDispatch(dispatch) {
    if (!email || email.length === 0 ||
      !password || password.length === 0
      ) {
      throw new Error('Missing items');
    }
    // Set the submitting flag
    dispatch(requestLogin());
    fetch('/api/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(function processReturn(response) {
      if (response.status === 201 || response.status === 200) {
        console.log('login ok');
        return Promise.resolve(response.json())
        .then(function sendAccountData(data) {
          return dispatchAccountData(dispatch, data);
        })
        .then(dispatchLoginFormClear(dispatch))
        .then(function goHome() {
          return dispatch(
            push('/'),
          );
        });
      } else if (response.status === 422) {
        console.log(`login failed with text: ${response.statusText}`);
        return dispatch(
          loginError(response.statusText, 422),
        );
      }
      return null;
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(
        loginError(errMsg),
      );
    });
  };
};

// ------ //
// LOGOUT //
// ------ //

/* The heavy lifting work of logging in an account.
 * @param {string} email
 * @param {string} password
 * Calls to the api endpoint to log in, parses it,
 *   places the account info in the store and clears the login form.
 */
const logoutAccountAPI = function logoutAccountAPI() {
  return function fetchLogoutDispatch(dispatch) {
    const url = '/api/v1/sessions';
    return fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    .then(function clearTheAccount() {
      return dispatch(
        clearAccountInfo(),
      );
    })
    .then(function goHome() {
      return dispatch(
        push('/'),
      );
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(
        loginError(errMsg),
      );
    });
  };
};

// ------ //
// ADDING //
// ------ //


/* Clears the new account data from the store
  */
function dispatchNewAccountFormClear(dispatch) {
  return dispatch(
    formClear(REG_FORM_NAME),
  );
}
/* The heavy lifting work of adding an account.
 * @param {string} displayName
 * @param {string} email
 * @param {string} password
 * Calls to the api endpoint to create an account, parses it,
 *   places the account info in the store and clears the form.
 */
const addAccountAPI = function addAccountAPI(displayName, email, password) {
  return function fetchPageDispatch(dispatch) {
    if (!displayName || displayName.length === 0 ||
      !email || email.length === 0 ||
      !password || password.length === 0
      ) {
      throw new Error('Missing items');
    }
    // Set the submitting flag
    dispatch(submittingAccountInfo());
    fetch('/api/v1/account', {
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
    .then(function processReturn(response) {
      if (response.status === 201) {
        console.log('account created');
        return Promise.resolve(response.json())
        .then(function sendAccountData(data) {
          return dispatchAccountData(dispatch, data);
        })
        .then(dispatchNewAccountFormClear(dispatch))
        .then(function goHome() {
          return dispatch(
            push('/'),
          );
        });
      } else if (response.status === 409) {
        console.log(`login failed with text: ${response.statusText}`);
        return dispatch(
          submitAccountError(response.statusText, 422),
        );
      }
      return null;
    })
    .catch(function submitError(error) {
      const errMsg = error.message;
      return dispatch(
        submitAccountError(errMsg),
      );
    });
  };
};

export { fetchAccountAPI, addAccountAPI, loginAccountAPI, logoutAccountAPI };
