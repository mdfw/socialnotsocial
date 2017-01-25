import {
  REG_FORM_UPDATE,
  REG_FORM_CLEAR,
} from '../actions/registerForm';

const DEFAULT_REGFORM_STATE = {
  displayName: '',
  email: '',
  password: '',
  fieldsTouched: [],
  fieldsExited: [],
};

const regFormReducer = function regFormReducer(state = DEFAULT_REGFORM_STATE, action) {
  let newstate = Object.assign({}, state);
  switch (action.type) {
    case REG_FORM_UPDATE: {
      const regKeys = Object.keys(action.fields);
      regKeys.forEach((key) => {
        newstate[key] = action.fields[key];
      });
      break;
    }
    case REG_FORM_CLEAR: {
      newstate = {};
      break;
    }
    default:
      break;
  }
  return newstate;
};

export default regFormReducer;
