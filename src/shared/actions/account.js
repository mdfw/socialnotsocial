import cookie from 'react-cookie';
import { fetchAccountAPI, addAccountAPI, loginAccountAPI, logoutAccountAPI } from './accountAPI';
import { COOKIE_NAME_SESSION } from '../../globalConstants';

const RECEIVED_ACCOUNT_INFO = 'RECEIVED_ACCOUNT_INFO';
function receivedAccountInfo(account) {
  return {
    type: RECEIVED_ACCOUNT_INFO,
    displayName: account.displayName,
    email: account.email,
    accountType: account.userType,
    dateCreated: account.created_at,
    validated: account.validated,
    accountId: Number(account.id),
    authenticated: true,
    fetching: false,
  };
}

const REQUESTING_ACCOUNT_INFO = 'REQUESTING_ACCOUNT_INFO';
function requestingAccountInfo() {
  return { type: REQUESTING_ACCOUNT_INFO };
}

const RECEIVED_ACCOUNT_ERROR = 'RECEIVED_ACCOUNT_ERROR';
function receivedAccountError(errorMessage) {
  return {
    type: RECEIVED_ACCOUNT_ERROR,
    errorMessage: errorMessage,
  };
}

function fetchAccount() {
  return (dispatch) => {
    dispatch(requestingAccountInfo());
    dispatch(fetchAccountAPI());
  };
}

const CLEAR_ACCOUNT_INFO = 'CLEAR_ACCOUNT_INFO';
function clearAccountInfo() {
  return { type: CLEAR_ACCOUNT_INFO };
}

function logoutAccount() {
  return (dispatch) => {
    cookie.remove(COOKIE_NAME_SESSION);
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
function loginError(errorMessage, statusCode) {
  return {
    type: LOGIN_ERROR,
    errorMessage: errorMessage,
    statusCode: statusCode,
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
function submitAccountError(errorMessage, statusCode) {
  return {
    type: SUBMIT_ACCOUNT_ERROR,
    errorMessage: errorMessage,
    statusCode: statusCode,
  };
}

const SUBMIT_ACCOUNT_ERROR_ACK = 'SUBMIT_ACCOUNT_ERROR_ACK';
function submitAccountErrorAck() {
  return {
    type: SUBMIT_ACCOUNT_ERROR_ACK,
  };
}

export {
  REQUESTING_ACCOUNT_INFO,
  requestingAccountInfo,
  RECEIVED_ACCOUNT_INFO,
  receivedAccountInfo,
  RECEIVED_ACCOUNT_ERROR,
  receivedAccountError,
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
