const REG_FORM_NAME = 'registerForm';
const LOGIN_FORM_NAME = 'loginForm';


const FORM_CLEAR = 'FORM_CLEAR';
function formClear(formId) {
  return {
    type: FORM_CLEAR,
    formId: formId,
  };
}

const FORM_UPDATE = 'FORM_UPDATE';
function formUpdate(formId, fields) {
  const newFields = {};
  const keys = Object.keys(fields);
  keys.forEach((key) => {
    newFields[key] = fields[key];
  });
  return {
    type: FORM_UPDATE,
    fields: newFields,
    formId: formId,
  };
}

export {
  REG_FORM_NAME,
  LOGIN_FORM_NAME,
  FORM_UPDATE,
  formUpdate,
  FORM_CLEAR,
  formClear,
};
