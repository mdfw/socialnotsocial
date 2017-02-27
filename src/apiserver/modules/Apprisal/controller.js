import { models } from '../../models';
import { proxyUserId } from '../Authentication';

const Apprisal = models.Apprisal;

/* Get all of the apprisals for the userId.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the search parameters.
 */
const getApprisalsEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Apprisal.findAllForUser(userId)
    .then((apprisals) => {
      const cleanApprisals = apprisals.map(function jsonify(apprisal) {
        return apprisal.toJSON();
      });
      res.status(200).json({
        success: true,
        apprisals: cleanApprisals,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(404).end();
    });
};

/* Adds an apprisal to the Apprisals database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} postId - the post to apprise
 *   @param {string} recipientId - the identifier for the recipient.
 *   @param {bool} canRespond - Overrides the default for the recipient
 *   @param (number=} onBehalfOfId - (optional) The userId to act on behalf of if current user
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the userId to search for.
 */
const addApprisalEndpoint = (req, res) => {
  const { postId, recipientId, canRespond } = req.body;
  const userId = proxyUserId(req);
  const newApprisal = Apprisal.build({
    post_id: postId,
    recipient_id: recipientId,
    canRespond: canRespond,
    user_id: userId,
  });
  newApprisal.save()
    .then((createdApprisal) => {
      res.status(201).json({
        success: true,
        message: 'Successfully created apprisal',
        apprisal: createdApprisal.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Apprisal creation error: ');
      console.dir(err);
      let errorMessage = 'Apprisal could not be created.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Updates an apprisal - can only update the canRespond value
 * Params needed in req.body:
 *   @param {bool=} canRespond - Overrides the default for the recipient
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) apprisalId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} userId - Will be pulled from req.user.
 *  Uses proxyUserId() to get the userId to search for.
 */
const updateApprisalEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let apprisalId = req.params.apprisalId;
  if (req.body.apprisalId) {
    apprisalId = req.body.apprisalId;
  }
  if (!apprisalId) {
    res.statusMessage = 'No apprisalId provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  const updates = {};
  if (typeof req.body.canRespond !== 'undefined') {
    updates.canRespond = req.body.canRespond;
  }
  if (Object.keys(updates).length === 0) {
    res.statusMessage = 'Nothing to update'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Apprisal.updateApprisal(apprisalId, userId, updates)
    .then((updatedApprisal) => {
      if (!updatedApprisal) {
        res.statusMessage = 'Apprisal was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Successfully updated apprisal',
        apprisal: updatedApprisal.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Apprisal update error: ');
      console.dir(err);
      let errorMessage = 'Apprisal could not be updated.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


/* Removes an apprisal (marks the status to 'removed')
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) apprisalId - Will be pulled from req.params or req.body (body takes priority)
 *  Uses proxyUserId() to get the userId to search for.
 *  @returns status 204 on success and 422 on error or 404 if Apprisal to update is not found.
 */
const removeApprisalEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let apprisalId = req.params.apprisalId;
  if (req.body.apprisalId) {
    apprisalId = req.body.apprisalId;
  }
  if (!apprisalId) {
    res.statusMessage = 'No apprisalId provided.'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Apprisal.deleteApprisal(apprisalId, userId)
    .then((removedItem) => {
      if (!removedItem) {
        res.statusMessage = 'Apprisal was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(204).end();
    })
    .catch((err) => {
      let errorMessage = 'Apprisal could not be removed.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


export {
  getApprisalsEndpoint,
  addApprisalEndpoint,
  updateApprisalEndpoint,
  removeApprisalEndpoint,
};
