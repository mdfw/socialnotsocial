import Account from './model';
import SignupValidator from '../../../shared/helpers/signupValidators';

export const signup = (req, res) => {
  console.log('got to signup with body: ');
  console.dir(req.body);
  const { email, password, displayName } = req.body;
  console.log(`controller: email: ${email} password: ${password} displayName: ${displayName}`);

  /* Validate the fields */
  const validator = new SignupValidator(email, password, displayName);
  const fieldsValid = validator.allFields();
  if (!fieldsValid.success) {
    res.status(422).json(fieldsValid);
  }

  // Search the database for a user object with the submitted email.
  Account.findOne({ 'local.email': email })
    .then((auth) => {
      if (auth) res.status(422).json({ success: false, message: 'Email is already in use.' });

      // Create a new instance of the user model for the new user.
      const newAccount = new Account({ local: { email, password, displayName } });
      // Save the new user object to the database.
      newAccount.save()
        .then(account => res.status(201).json({
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
