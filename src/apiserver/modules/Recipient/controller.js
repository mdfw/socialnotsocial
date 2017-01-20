import { Recipient, RecipientStatus } from './model';

/* Returns either the current account's accountId or, if onBehalfOfId is passed in
 *  to the body, it will verify if the current account can act on behalf of the passed
 *  in id and return that.
 *  @param {object} req - the request object that has a user account attached
 *  @returns {string} accountId - the accountId to use in searches.
 */
const activeAccountId = function getAccount(req) {
  const currentAccount = req.user;
  const onBehalfOfId = req.body.onBehalfOfId;
  if (onBehalfOfId && onBehalfOfId.length > 0) {
    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {
      return onBehalfOfId;
    }
  }
  return req.user.accountId;
};

/* Get all of the recipients for the accountId.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the search parameters.
 */
const getRecipientsEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const accountId = activeAccountId(req);
  if (!accountId) {
    return res.status(422).json({ success: false, message: 'No accountId provided' });
  }
  Recipient.findAllForId(accountId, false)
    .then((recipients) => {
      const cleanRecipients = recipients.map(function jsonify(recipient) {
        return recipient.toJSON();
      });
      console.log('Found these recipients');
      console.dir(recipients);
      res.status(201).json({
        success: true,
        recipients: cleanRecipients,
      });
    })
    .catch((err) => {
      res.status(422).json({ success: false, message: err.message });
    });
};

/* Adds an recipient to the Recipients database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} email - the email address
 *   @param {string} displayName - the displayName for the recipient.
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const addRecipientEndpoint = (req, res) => {
  const { email, displayName } = req.body;
  const accountId = activeAccountId(req);
  const newRecipient = new Recipient({
    email: email,
    displayName: displayName,
    ownerAccountId: accountId,
  });
  console.log('Heres the new recipient');
  console.dir(newRecipient);
  newRecipient.save()
    .then((createdRecipient) => {
      console.log('Created new recipient: ');
      console.dir(createdRecipient);
      console.dir(createdRecipient.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully created recipient',
        recipient: createdRecipient.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Recipient creation error: ');
      console.dir(err);
      let errorMessage = 'Recipient could not be created.';
      if (err.code === 11000) {
        errorMessage = 'Recipient already exists';
      } else if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};

/* Updates a recipient
 * Params needed in req.body:
 *   @param {string=} email (optional) - the email address to update.
 *   @param {string=} displayName (optional) - the displayName to update.
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) recipientId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const updateRecipientEndpoint = (req, res) => {
  let recipientId = req.params.recipientId;
  if (req.body.recipientId) {
    recipientId = req.body.recipientId;
  }
  const { email, displayName, status } = req.body;
  if (!recipientId) {
    res.status(422).json({ success: false, messages: 'No recipientId provided.' });
  }

  const accountId = activeAccountId(req);
  const updates = {};
  if (email && email.length > 0) updates.email = email;
  if (displayName && displayName.length > 0) updates.displayName = displayName;
  if (status && status.length > 0) updates.status = status;

  if (Object.keys(updates).length === 0) {
    res.status(422).json({ success: false, messages: 'Nothing to update.' });
  }
  Recipient.update(recipientId, accountId, updates)
    .then((updatedRecipient) => {
      console.log('Updated recipient: ');
      console.dir(updatedRecipient);
      console.dir(updatedRecipient.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully updated recipient',
        recipient: updatedRecipient.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Recipient update error: ');
      console.dir(err);
      let errorMessage = 'Recipient could not be updated.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};


/* Removes a recipient (marks the status to 'removed')
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) recipientId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const removeRecipientEndpoint = (req, res) => {
  let recipientId = req.params.recipientId;
  if (req.body.recipientId) {
    recipientId = req.body.recipientId;
  }
  if (!recipientId) {
    res.status(422).json({ success: false, messages: 'No recipientId provided.' });
  }

  const accountId = activeAccountId(req);
  Recipient.update(recipientId, accountId, { status: RecipientStatus.REMOVED })
    .then((updatedRecipient) => {
      console.log('Updated recipient: ');
      console.dir(updatedRecipient);
      console.dir(updatedRecipient.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully removed recipient',
      });
    })
    .catch((err) => {
      console.log('Recipient removal error: ');
      console.dir(err);
      let errorMessage = 'Recipient could not be removed.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};


export {
  getRecipientsEndpoint,
  addRecipientEndpoint,
  updateRecipientEndpoint,
  removeRecipientEndpoint,
};
