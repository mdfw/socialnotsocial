import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import cookie from 'react-cookie';
import {
  submittingAccountInfo,
  receivedAccountInfo,
  receivedAccountError,
  submitAccountError,
  requestLogin,
  loginError,
  clearAccountInfo,
} from './account';
import { formClear, REG_FORM_NAME, LOGIN_FORM_NAME } from './forms';
import { COOKIE_NAME_HAS_LOGGED_IN, COOKIE_NAME_INDICATE_SESSION } from '../../globalConstants';


/* If we have valid new account data, dispatch it to the store.
 * Throw error on failure.
 * TODO: This seems fragile - is there a way to have server and
 *  this have agreement on what to expect?
 */
function dispatchAccountData(dispatch, data) {
  const user = data.user;
  if (!user.displayName ||
    user.displayName.length === 0 ||
    !user.email ||
    user.email.length === 0 ||
    !user.id ||
    user.id.length === 0
  ) {
    throw new Error('Invalid account information returned.');
  }
  return dispatch(
    receivedAccountInfo(user),
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
    const url = '/api/v1/users';
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
      // TODO: I don't think this is the right place for this destruction.
      cookie.remove(COOKIE_NAME_INDICATE_SESSION);
      dispatch(
        receivedAccountError(error),
      );
      return dispatch(
        push('/'),
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
        return Promise.resolve(response.json())
        .then(function sendAccountData(data) {
          return dispatchAccountData(dispatch, data);
        })
        .then(dispatchLoginFormClear(dispatch))
        .then(function goHome() {
          const tenYearsHence = new Date();
          tenYearsHence.setYear(tenYearsHence.getFullYear() + 10);
          cookie.save(COOKIE_NAME_HAS_LOGGED_IN, 'y', {
            expires: tenYearsHence,
            httpOnly: false,
            secure: false,
            path: '/',
          });
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
        push('/welcome'),
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
    fetch('/api/v1/users', {
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
      } else if (response.status) {
        console.log(`login failed with error: ${response.status}: ${response.statusText}`);
        throw new Error(`Creating user failed. Error is: ${response.statusText}`);
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
