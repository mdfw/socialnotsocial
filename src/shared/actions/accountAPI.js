import fetch from 'isomorphic-fetch';
import { receiveAccountInfo, receiveAccountError, submitAccountError } from './account';

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

function checkAddAPIStatus(response) {
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

const addAccountAPI = function addAccountAPI(displayName, email, passsword) {
  return function fetchPageDispatch(dispatch) {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        displayName: displayName,
        email: email,
        passsword: passsword,
      }),
    })
    .then(checkAddAPIStatus)
    .then(function returnAccountData(account) {
      return dispatch(
        receiveAccountInfo(account),
      );
    })
    .catch(function submitError(error) {
      return dispatch(
        submitAccountError(error),
      );
    });
  };
};

export { fetchAccountAPI, addAccountAPI };
