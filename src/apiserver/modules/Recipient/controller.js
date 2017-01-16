import { Recipient } from './model';
import { appraiseThese } from '../../../shared/helpers/appraise';

const addRecipient = (email, displayName, ownerAccountId) => {
  /* Adds a recipient.
   * A recipient requires an ownerAccountId, a displayName and an email address.
   * Checks for validity of these fields uing the appraiser.
   */
  const status = {
    errors: {},
    account: null,
  };

  return new Promise(function addRecipientPromise(resolve, reject) {
    /* Validate the fields */
    const fieldsValid = appraiseThese({
      email: email,
      ownerAccountId: ownerAccountId,
      displayName: displayName,
    });
    if (!fieldsValid.success) {
      status.errors = fieldsValid.errors;
      reject(status);
    }

    // Search the database for a recipient object with the submitted email and owner.
    Recipient.findOne({ email: email, ownerAccountId: ownerAccountId })
      .then((foundAccount) => {
        if (foundAccount) {
          status.errors.email = 'Recipient exists.';
          reject(status);
        }

        // Create a new instance of the model.
        const newRecipient = new Recipient({ email, ownerAccountId, displayName });
        // Save the new object to the database.
        newRecipient.save()
          .then((savedAccountDoc) => {
            status.account = savedAccountDoc;
            resolve(status);
          })
          .catch((err) => {
            let error;
            if (err.code === 11000) error = 'Recipient exists.';
            status.errors.email = error;
            return status;
          });
      });
  });
};

const addRecipientRequest = (req, res) => {
  /* addRecipientRequest: Respond to a add event through the API by calling addRecipient */
  const { email, ownerAccountId, displayName } = req.body;

  addRecipient(email, displayName, ownerAccountId)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Successfully Added',
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

export { addRecipientRequest, addRecipient, update };
