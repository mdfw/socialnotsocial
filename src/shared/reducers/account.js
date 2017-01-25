import {
  REQUEST_ACCOUNT_INFO,
  RECEIVE_ACCOUNT_ERROR,
  RECEIVE_ACCOUNT_INFO,
  REQUEST_LOGIN,
  LOGIN_ERROR,
  LOGIN_ERROR_ACK,
  SUBMITTING_ACCOUNT_INFO,
  SUBMIT_ACCOUNT_ERROR,
  SUBMIT_ACCOUNT_ERROR_ACK,
} from '../actions/account';

const DEFAULT_ACCOUNT_STATE = {
  displayName: '',
  email: '',
  type: '',
  dateCreated: '',
  accountId: '',
  authenticated: false,
  fetching: false,
  fetchError: null,
  loggingIn: false,
  loginError: null,
  submitting: false,
  submitError: null,
};

const accountReducer = function accountReducer(state = DEFAULT_ACCOUNT_STATE, action) {
  let newstate = state;
  switch (action.type) {
    case RECEIVE_ACCOUNT_INFO: {
      newstate = {
        ...state,
        displayName: action.displayName,
        email: action.email,
        type: action.accountType,
        dateCreated: action.dateCreated,
        accountId: action.accountId,
        authenticated: true,
        fetching: false,
        submitting: false,
        loggingIn: false,
      };
      break;
    }
    case REQUEST_ACCOUNT_INFO: {
      newstate = {
        ...state,
        fetching: true,
      };
      break;
    }
    case RECEIVE_ACCOUNT_ERROR: {
      newstate = {
        ...state,
        fetching: false,
        fetchError: action.errorMessage,
      };
      break;
    }
    case REQUEST_LOGIN: {
      newstate = {
        ...state,
        loggingIn: true,
      };
      break;
    }
    case LOGIN_ERROR: {
      newstate = {
        ...state,
        loggingIn: false,
        loginError: action.errorMessage,
      };
      break;
    }
    case LOGIN_ERROR_ACK: {
      newstate = {
        ...state,
        loginError: null,
      };
      break;
    }
    case SUBMITTING_ACCOUNT_INFO: {
      newstate = {
        ...state,
        submitting: true,
      };
      break;
    }
    case SUBMIT_ACCOUNT_ERROR: {
      newstate = {
        ...state,
        submitting: false,
        submitError: action.errorMessage,
      };
      break;
    }
    case SUBMIT_ACCOUNT_ERROR_ACK: {
      newstate = {
        ...state,
        submitError: null,
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default accountReducer;
