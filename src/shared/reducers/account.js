

const DEFAULT_ACCOUNT_STATE = {
  displayName: '',
  email: '',
  type: '',
  dateCreated: '',
  accountId: '',
  authenticated: false,
};

const accountReducer = function accountReducer(state = DEFAULT_ACCOUNT_STATE, action) {
  let newstate = state;
  switch (action.type) {
    case SET_ACCOUNT_INFO: {
      newstate = {
        ...state,
        displayName: action.displayName,
        email: action.email,
        type: action.type,
        dateCreated: action.dateCreated,
        accountId: action.accountId,
        authenticated: action.authenticated,
      };
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default accountReducer;
