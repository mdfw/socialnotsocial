import { models } from '../../models';
import { proxyUserId } from '../Authentication';

const Recipient = models.Recipient;

/* Get all of the recipients for the userId.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the search parameters.
 */
const getRecipientsEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Recipient.findAllForUser(userId)
    .then((recipients) => {
      const cleanRecipients = recipients.map(function jsonify(recipient) {
        return recipient.toJSON();
      });
      res.status(200).json({
        success: true,
        recipients: cleanRecipients,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(404).end();
    });
};

/* Adds an recipient to the Recipients database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} email - the email address
 *   @param {string} displayName - the displayName for the recipient.
 *   @param (number=} onBehalfOfId - (optional) The userId to act on behalf of if current user
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the userId to search for.
 */
const addRecipientEndpoint = (req, res) => {
  const { email, displayName } = req.body;
  const userId = proxyUserId(req);
  const newRecipient = Recipient.build({
    email: email,
    displayName: displayName,
    user_id: userId,
  });
  console.log('Heres the new recipient');
  console.dir(newRecipient);
  newRecipient.save()
    .then((createdRecipient) => {
      console.log('Created new recipient: ');
      console.dir(createdRecipient);
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
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
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
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let recipientId = req.params.recipientId;
  if (req.body.recipientId) {
    recipientId = req.body.recipientId;
  }
  const { email, displayName, status } = req.body;
  if (!recipientId) {
    res.statusMessage = 'No recipientId provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }

  const updates = {};
  if (email && email.length > 0) updates.email = email;
  if (displayName && displayName.length > 0) updates.displayName = displayName;
  if (status && status.length > 0) updates.status = status;

  if (Object.keys(updates).length === 0) {
    res.statusMessage = 'Nothing to update'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Recipient.updateRecipient(recipientId, userId, updates)
    .then((updatedRecipient) => {
      console.log('Updated recipient: ');
      console.dir(updatedRecipient);
      if (!updatedRecipient) {
        res.statusMessage = 'Recipient was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
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
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


/* Removes a post (marks the status to 'removed')
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  Uses proxyUserId() to get the userId to search for.
 */
const removeRecipientEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let itemId = req.params.recipientId;
  if (req.body.recipientId) {
    itemId = req.body.recipientId;
  }
  if (!itemId) {
    res.statusMessage = 'No recipientId provided.'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Recipient.deleteRecipient(itemId, userId)
    .then((updatedItem) => {
      if (!updatedItem) {
        res.statusMessage = 'Recipient was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(204).end();
    })
    .catch((err) => {
      let errorMessage = 'Recipient could not be removed.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


export {
  getRecipientsEndpoint,
  addRecipientEndpoint,
  updateRecipientEndpoint,
  removeRecipientEndpoint,
};
