import Account from './model';
import SignupValidator from '../../../shared/helpers/signupValidators';

export const signup = (req, res) => {
  /* Signing up requires an email, password and displayName.
   * Checks for validity of these fields uing the signupValidators.
   */
  const { email, password, displayName } = req.body;

  /* Validate the fields */
  const validator = new SignupValidator(email, password, displayName);
  const fieldsValid = validator.allFields();
  if (!fieldsValid.success) {
    res.status(422).json(fieldsValid);
  }

  // Search the database for a user object with the submitted email.
  Account.findOne({ 'local.email': email })
    .then((account) => {
      if (account) res.status(422).json({ success: false, message: 'Email is already in use.' });

      // Create a new instance of the account model.
      const newAccount = new Account({ local: { email, password, displayName } });
      // Save the new account object to the database.
      newAccount.save()
        .then(() => res.status(201).json({
          success: true,
          message: 'Successfully Registerd',
        }))
        .catch((err) => {
          let error;
          if (err.code === 11000) error = 'Email is already in use.';
          res.status(422).json({ success: false, message: error || err });
        });
    });
};

export const addAccount = (email, displayName) => {
  const validator = new SignupValidator(email, null, displayName);

  const emailValidationMessages = validator.displayNameValid();
  if (emailValidationMessages.length > 0) {
    return new Error(emailValidationMessages.join());
  }
  const displayNameValidationMessages = validator.emailValid();
  if (displayNameValidationMessages.length > 0) {
    return new Error(displayNameValidationMessages.join());
  }
  Account.findOne({ 'local.email': email })
  .then((dupaccount) => {
    if (dupaccount) {
      return dupaccount;
    }

    // Create a new instance of the account model.
    const newAccount = new Account({ local: { email, displayName } });
    // Save the new account object to the database.
    newAccount.save()
      .then((account) => { return account; })  // eslint-disable-line arrow-body-style
      .catch((err) => {
        let error;
        if (err.code === 11000) error = 'Email is already in use.';
        const errormsg = error || err;
        return new Error(errormsg);
      });
    return null;
  });
  return null;
};
