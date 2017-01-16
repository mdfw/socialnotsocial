import { Recipient } from './model';
import { appraiseThese } from '../../../shared/helpers/appraise';

const getRecipients = (ownerAccountId) => {
 const recipients = {
    error: null,
    recipients: null,
  };

  return new Promise(function getRecipientsPromise(resolve, reject) {
    const fieldsValid = appraiseThese({
      ownerAccountId: ownerAccountId,
    });
    if (!fieldsValid.success) {
      recipients.error = fieldsValid.errors.join();
      reject(recipients);
    }
    
    Recipient.find({ ownerAccountId: ownerAccountId})
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      })
  })
};

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
    console.log('Adding recipient');
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
    console.log('Starting search for a recipient');
    // Search the database for a recipient object with the submitted email and owner.
    Recipient.findOne({ email: email, ownerAccountId: ownerAccountId })
      .then((foundAccount) => {
        if (foundAccount) {
          status.errors.email = 'Recipient exists.';
          reject(status);
        }
        console.log('Recipient not found, adding');
        // Create a new instance of the model.
        const newRecipient = new Recipient({ email, ownerAccountId, displayName });
        console.log('Created recipient:');
        console.dir(newRecipient)
        // Save the new object to the database.
        newRecipient.save()
          .then((savedAccountDoc) => {
            status.account = savedAccountDoc;
            resolve(status);
          })
          .catch((err) => {
            console.log('Failed saving recipient: ');
            console.dir(err);
            let error = 'Failed to save recipient, likely an internal error.';
            if (err.code === 11000) error = 'Recipient exists.';
            status.errors.email = error;
            reject(status);
          });
      })
      .catch((err) => {
        console.log('Failed searching for recipient: ');
        console.dir(err);
        status.errors.account = err;
        reject(status);
      })
  });
};


const updateRecipient = (req, res) => {
  res.status(418).json({
    message: 'Brewing',
  });
};

export { getRecipients, addRecipient, updateRecipient };
