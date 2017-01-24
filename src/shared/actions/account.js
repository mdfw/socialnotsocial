import { fetchAccountAPI, addAccountAPI } from './accountAPI';

const REQUEST_ACCOUNT_INFO = 'REQUEST_ACCOUNT_INFO';
function requestAccountInfo() {
  return { type: REQUEST_ACCOUNT_INFO };
}

const RECEIVE_ACCOUNT_ERROR = 'RECEIVE_ACCOUNT_ERROR';
function receiveAccountError(errorMessage) {
  return {
    type: RECEIVE_ACCOUNT_ERROR,
    errorMessage: errorMessage,
  };
}

const RECEIVE_ACCOUNT_INFO = 'RECEIVE_ACCOUNT_INFO';
function receiveAccountInfo(account) {
  return {
    type: RECEIVE_ACCOUNT_INFO,
    displayName: account.displayName,
    email: account.email,
    accountType: account.type,
    dateCreated: account.dateCreated,
    accountId: account.accountId,
    authenticated: account.authenticated,
    fetching: account.fetching,
  };
}

function fetchAccount() {
  return (dispatch) => {
    dispatch(requestAccountInfo());
    dispatch(fetchAccountAPI());
  };
}

const SUBMITTING_ACCOUNT_INFO = 'SUBMITTING_ACCOUNT_INFO';
function submittingAccountInfo() {
  return { type: SUBMITTING_ACCOUNT_INFO };
}

const SUBMIT_ACCOUNT_ERROR = 'SUBMIT_ACCOUNT_ERROR';
function submitAccountError(errorMessage) {
  return {
    type: SUBMIT_ACCOUNT_ERROR,
    errorMessage: errorMessage,
  };
}

function submitNewAccount(displayName, email, password) {
  return (dispatch) => {
    dispatch(submittingAccountInfo());
    dispatch(addAccountAPI(displayName, email, password));
  };
}


export {
  REQUEST_ACCOUNT_INFO,
  requestAccountInfo,
  RECEIVE_ACCOUNT_ERROR,
  receiveAccountError,
  RECEIVE_ACCOUNT_INFO,
  receiveAccountInfo,
  fetchAccount,
  SUBMITTING_ACCOUNT_INFO,
  submittingAccountInfo,
  SUBMIT_ACCOUNT_ERROR,
  submitAccountError,
  submitNewAccount,
};
