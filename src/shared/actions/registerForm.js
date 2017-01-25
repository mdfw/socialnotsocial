const REG_FORM_CLEAR = 'REG_FORM_CLEAR';
function registerFormClear() {
  return { type: REG_FORM_CLEAR };
}

const REG_FORM_UPDATE = 'REG_FORM_UPDATE';
function registerFormUpdate(fields) {
  const newFields = {};
  const keys = Object.keys(fields);
  keys.forEach((key) => {
    newFields[key] = fields[key];
  });
  return {
    type: REG_FORM_UPDATE,
    fields: newFields,
  };
}

export {
  REG_FORM_UPDATE,
  registerFormUpdate,
  REG_FORM_CLEAR,
  registerFormClear,
};
