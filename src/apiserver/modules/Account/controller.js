import Account from './model';
import { appraiseThese } from '../../../shared/helpers/appraise';

const addAccount = (email, password, displayName) => {
  /* Does the actual account adding and returns the status item
   * A new account requires an email, password and displayName.
   * Checks for validity of these fields uing the appraiser.
   */
  const status = {
    errors: {},
    account: null,
  };

  return new Promise(function addAccountPromise(resolve, reject) {
    /* Validate the fields */
    const fieldsValid = appraiseThese({
      email: email,
      password: password,
      displayName: displayName,
    });
    if (!fieldsValid.success) {
      status.errors = fieldsValid.errors;
      reject(status);
    }

    // Search the database for a user object with the submitted email.
    Account.findOne({ email: email })
      .then((foundAccount) => {
        if (foundAccount) {
          status.errors.email = 'Email is already in use.';
          reject(status);
        }

        // Create a new instance of the account model.
        const newAccount = new Account({ email, password, displayName });
        // Save the new account object to the database.
        newAccount.save()
          .then((savedAccountDoc) => {
            status.account = savedAccountDoc;
            resolve(status);
          })
          .catch((err) => {
            let error;
            if (err.code === 11000) error = 'Email is already in use.';
            status.errors.email = error;
            return status;
          });
      });
  });
};

const addAccountRequest = (req, res) => {
  /* addAccountRequest: Respond to a signup event through the API by calling addAccount */
  const { email, password, displayName } = req.body;

  addAccount(email, password, displayName)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Successfully Registerd',
      });
    })
    .catch((error) => {
      res.status(422).json({ success: false, message: error.errors });
    });
};

const update = (req, res) => {
  res.status(418).json({
    message: 'Brewing',
  });
};

export { addAccountRequest, addAccount, update };
