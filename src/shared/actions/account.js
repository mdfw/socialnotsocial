import cookie from 'react-cookie';
import { fetchAccountAPI, addAccountAPI, loginAccountAPI, logoutAccountAPI } from './accountAPI';

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

function fetchAccount() {
  return (dispatch) => {
    dispatch(requestAccountInfo());
    dispatch(fetchAccountAPI());
  };
}

const CLEAR_ACCOUNT_INFO = 'CLEAR_ACCOUNT_INFO';
function clearAccountInfo() {
  return { type: CLEAR_ACCOUNT_INFO };
}

function logoutAccount() {
  return (dispatch) => {
    cookie.remove('snss');
    dispatch(logoutAccountAPI());
  };
}

function loginAccount(email, password) {
  return (dispatch) => {
    dispatch(loginAccountAPI(email, password));
  };
}


const REQUEST_LOGIN = 'REQUEST_LOGIN';
function requestLogin() {
  return { type: REQUEST_LOGIN };
}

const LOGIN_ERROR = 'LOGIN_ERROR';
function loginError(errorMessage) {
  return {
    type: LOGIN_ERROR,
    errorMessage: errorMessage,
  };
}
const LOGIN_ERROR_ACK = 'LOGIN_ERROR_ACK';
function loginErrorAck() {
  return {
    type: LOGIN_ERROR_ACK,
  };
}


function submitNewAccount(displayName, email, password) {
  return (dispatch) => {
    dispatch(addAccountAPI(displayName, email, password));
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

const SUBMIT_ACCOUNT_ERROR_ACK = 'SUBMIT_ACCOUNT_ERROR_ACK';
function submitAccountErrorAck() {
  return {
    type: SUBMIT_ACCOUNT_ERROR_ACK,
  };
}

export {
  REQUEST_ACCOUNT_INFO,
  requestAccountInfo,
  RECEIVE_ACCOUNT_INFO,
  receiveAccountInfo,
  RECEIVE_ACCOUNT_ERROR,
  receiveAccountError,
  fetchAccount,
  REQUEST_LOGIN,
  requestLogin,
  LOGIN_ERROR,
  loginError,
  LOGIN_ERROR_ACK,
  loginErrorAck,
  loginAccount,
  logoutAccount,
  SUBMITTING_ACCOUNT_INFO,
  submittingAccountInfo,
  SUBMIT_ACCOUNT_ERROR,
  submitAccountError,
  SUBMIT_ACCOUNT_ERROR_ACK,
  submitAccountErrorAck,
  submitNewAccount,
  CLEAR_ACCOUNT_INFO,
  clearAccountInfo,
};
