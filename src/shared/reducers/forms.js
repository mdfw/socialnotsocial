/* Reducers for form actions.
 * Requires a form name to be passed in.
 */

import {
  FORM_UPDATE,
  FORM_CLEAR,
  REG_FORM_NAME,
  LOGIN_FORM_NAME,
  CREATE_POST_FORM_NAME,
} from '../actions/forms';

const DEFAULT_REGFORM = {
  displayName: '',
  email: '',
  password: '',
  fieldsTouched: [],
  fieldsExited: [],
};

const DEFAULT_LOGINFORM = {
  email: '',
  password: '',
  fieldsTouched: [],
  fieldsExited: [],
};

const DEFAULT_CREATE_POST_FORM = {
  message: '',
  fieldsTouched: [],
  fieldsExited: [],
  submitting: false,
  submitError: null,
};

const DEFAULT_FORM_STATE = {
  [REG_FORM_NAME]: JSON.parse(JSON.stringify(DEFAULT_REGFORM)),
  [LOGIN_FORM_NAME]: JSON.parse(JSON.stringify(DEFAULT_LOGINFORM)),
  [CREATE_POST_FORM_NAME]: JSON.parse(JSON.stringify(DEFAULT_CREATE_POST_FORM)),
};

function emptyStateForForm(formId) {
  switch (formId) {
    case REG_FORM_NAME:
      return JSON.parse(JSON.stringify(DEFAULT_REGFORM));
    case LOGIN_FORM_NAME:
      return JSON.parse(JSON.stringify(DEFAULT_LOGINFORM));
    case CREATE_POST_FORM_NAME:
      return JSON.parse(JSON.stringify(DEFAULT_CREATE_POST_FORM));
    default:
      return {};
  }
}

const formReducer = function regFormReducer(state = DEFAULT_FORM_STATE, action) {
  const newstate = Object.assign({}, state);
  switch (action.type) {
    case FORM_UPDATE: {
      const formId = action.formId;
      const oldFields = state[formId];
      const regKeys = Object.keys(action.fields);
      regKeys.forEach((key) => {
        oldFields[key] = action.fields[key];
      });
      newstate[formId] = oldFields;
      break;
    }
    case FORM_CLEAR: {
      const formId = action.formId;
      const emptyState = emptyStateForForm(formId);
      newstate[formId] = emptyState;
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default formReducer;
