import {
  REQUEST_RECIPIENTS,
  RECEIVE_RECIPIENTS_ERROR,
  RECEIVE_RECIPIENTS,
} from '../actions/recipients';
import {
  CLEAR_ACCOUNT_INFO,
} from '../actions/account';


const DEFAULT_RECIPIENTS_STATE = () => (
  {
    recipients: [],
    fetching: false,
    fetchError: null,
  }
);

const recipientsReducer = function recipientsReducer(state = DEFAULT_RECIPIENTS_STATE(), action) {
  let newstate = state;
  switch (action.type) {
    case RECEIVE_RECIPIENTS: {
      newstate = {
        ...state,
        recipients: action.recipients,
        fetching: false,
        submitting: false,
      };
      break;
    }
    case REQUEST_RECIPIENTS: {
      newstate = {
        ...state,
        fetching: true,
      };
      break;
    }
    case RECEIVE_RECIPIENTS_ERROR: {
      newstate = {
        ...state,
        fetching: false,
        fetchError: action.errorMessage,
      };
      break;
    }
    case CLEAR_ACCOUNT_INFO: {
      newstate = DEFAULT_RECIPIENTS_STATE();
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default recipientsReducer;
