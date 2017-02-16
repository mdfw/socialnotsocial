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
  CLEAR_ACCOUNT_INFO,
} from '../actions/account';

import {
  FORM_UPDATE,
  LOGIN_FORM_NAME,
  REG_FORM_NAME,
} from '../actions/forms';

const DEFAULT_ACCOUNT_STATE = () => (
  {
    displayName: '',
    email: '',
    type: '',
    dateCreated: '',
    accountId: null,
    authenticated: false,
    fetching: false,
    fetchError: null,
    loggingIn: false,
    loginError: null,
    loginErrorStatusCode: null,
    submitting: false,
    submitError: null,
    submitErrorStatusCode: null,
  }
);
// TODO: Do the errors above belong here or with the forms they are triggered by?

const accountReducer = function accountReducer(state = DEFAULT_ACCOUNT_STATE(), action) {
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
        loginErrorStatusCode: action.statusCode,
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
    case FORM_UPDATE: {
      if ((state.loginError || state.loginErrorStatusCode) && action.formId === LOGIN_FORM_NAME) {
        newstate = {
          ...state,
          loginError: null,
          loginErrorStatusCode: null,
        };
      }
      if ((state.submitError || state.submitErrorStatusCode) && action.formId === REG_FORM_NAME) {
        newstate = {
          ...state,
          submitError: null,
          submitErrorStatusCode: null,
        };
      }
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
        submitErrorStatusCode: action.statusCode,
      };
      break;
    }
    case SUBMIT_ACCOUNT_ERROR_ACK: {
      newstate = {
        ...state,
        submitError: null,
        submitErrorStatusCode: null,
      };
      break;
    }
    case CLEAR_ACCOUNT_INFO: {
      newstate = DEFAULT_ACCOUNT_STATE();
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default accountReducer;
