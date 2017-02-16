import { models } from '../../models';
import { proxyUserId } from '../Authentication';

const Media = models.Media;

/* Get all of the media for the user.id.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the search parameters.
 */
const getMediaEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Media.findAllForUser(userId)
    .then((media) => {
      const cleanMedia = media.map(function jsonify(medium) {
        return medium.toJSON();
      });
      res.status(200).json({
        success: true,
        media: cleanMedia,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(404).end();
    });
};

/* Adds an media item to the Media database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} url - the email address
 *   @param {string} type - the type of media.
 *   @param (number=} onBehalfOfId - (optional) The userId to act on behalf of if current user
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the userId to search for.
 */
const addMediumEndpoint = (req, res) => {
  const { url, type } = req.body;
  const userId = proxyUserId(req);
  const newItem = Media.build({
    url: url,
    type: type,
    user_id: userId,
  });
  newItem.save()
    .then((createdMedia) => {
      res.status(201).json({
        success: true,
        message: 'Successfully created media item',
        media: createdMedia.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Media item creation error: ');
      console.dir(err);
      let errorMessage = 'Media item could not be created.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Updates a media item
 * Params needed in req.body:
 *   @param {string} url - the email address
 *   @param {string} type - the type of media.
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) mediaId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const updateMediumEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let mediaId = req.params.mediaId;
  if (req.body.mediaId) {
    mediaId = req.body.mediaId;
  }
  const { url, type } = req.body;
  if (!mediaId) {
    res.statusMessage = 'No mediaId provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }

  const updates = {};
  if (url && url.length > 0) updates.url = url;
  if (type && type.length > 0) updates.type = type;

  if (Object.keys(updates).length === 0) {
    res.statusMessage = 'Nothing to update'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Media.updateMedia(mediaId, userId, updates)
    .then((updatedItem) => {
      if (!updatedItem) {
        res.statusMessage = 'Media was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(201).json({
        success: true,
        message: 'Successfully updated media',
        media: updatedItem.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Media update error: ');
      console.dir(err);
      let errorMessage = 'Media could not be updated.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


/* Removes a media
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  Uses proxyUserId() to get the userId to search for.
 */
const removeMediumEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let itemId = req.params.mediaId;
  if (req.body.mediaId) {
    itemId = req.body.mediaId;
  }
  if (!itemId) {
    res.statusMessage = 'No mediaId provided.'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Media.deleteMedia(itemId, userId)
    .then((updatedItem) => {
      if (!updatedItem) {
        res.statusMessage = 'Media was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(204).end();
    })
    .catch((err) => {
      let errorMessage = 'Media could not be removed.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


export {
  getMediaEndpoint,
  addMediumEndpoint,
  updateMediumEndpoint,
  removeMediumEndpoint,
};
