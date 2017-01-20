import { Post, PostStatus } from './model';

/* Returns either the current account's accountId or, if onBehalfOfId is passed in
 *  to the body, it will verify if the current account can act on behalf of the passed
 *  in id and return that.
 *  @param {object} req - the request object that has a user account attached
 *  @returns {string} accountId - the accountId to use in searches.
 *   TODO: need to move it to it's own module since we're duplicating it in every controller.
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

/* Get all of the posts for the accountId.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the search parameters.
 */
const getPostsEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const accountId = activeAccountId(req);
  if (!accountId) {
    return res.status(422).json({ success: false, message: 'No accountId provided' });
  }
  Post.findAllForId(accountId, false)
    .then((items) => {
      const cleanedItems = items.map(function jsonify(mappedItem) {
        return mappedItem.toJSON();
      });
      console.log('Found these:');
      console.dir(cleanedItems);
      res.status(201).json({
        success: true,
        recipients: cleanedItems,
      });
    })
    .catch((err) => {
      res.status(422).json({ success: false, message: err.message });
    });
};

/* Adds a post to the Post database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} message - the main message body
 *   @param {string=} subject (optional) - subject of the post.
 *   @param {array[number]} photoIds - the photoIds associated with this post.
 *   @param {string=} status (optional) - Must be one of PostStatus (see Post model).
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const addPostEndpoint = (req, res) => {
  const { message, subject, photoIds, status } = req.body;
  const accountId = activeAccountId(req);
  const newItem = new Post({
    message: message,
    subject: subject,
    photoIds: photoIds,
    status: status,
    ownerAccountId: accountId,
  });
  newItem.save()
    .then((createdItem) => {
      console.log('Created new: ');
      console.dir(createdItem);
      console.dir(createdItem.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully created post',
        recipient: createdItem.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Post creation error: ');
      console.dir(err);
      let errorMessage = 'Post could not be created.';
      if (err.code === 11000) {
        errorMessage = 'Post already exists';
      } else if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};

/* Updates a post
 *   @param {string} message - the main message body
 *   @param {string=} subject (optional) - subject of the post.
 *   @param {array[number]} photoIds - the photoIds associated with this post.
 *   @param {string=} status (optional) - Must be one of PostStatus (see Post model).
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const updatePostEndpoint = (req, res) => {
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.status(422).json({ success: false, messages: 'No PostId provided.' });
  }

  const { message, subject, photoIds, status } = req.body;
  const accountId = activeAccountId(req);
  const updates = {};
  if (message && message.length > 0) updates.message = message;
  if (subject && subject.length > 0) updates.subject = subject;
  if (photoIds && photoIds.length > 0) updates.photoIds = photoIds;
  if (status && status.length > 0) updates.status = status;

  if (Object.keys(updates).length === 0) {
    res.status(422).json({ success: false, messages: 'Nothing to update.' });
  }
  Post.update(itemId, accountId, updates)
    .then((updatedItem) => {
      console.log('Updated: ');
      console.dir(updatedItem.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully updated post',
        post: updatedItem.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Post update error: ');
      console.dir(err);
      let errorMessage = 'Post could not be updated.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};


/* Removes a post (marks the status to 'removed')
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the accountId to search for.
 */
const removePostEndpoint = (req, res) => {
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.status(422).json({ success: false, messages: 'No postId provided.' });
  }

  const accountId = activeAccountId(req);
  Post.update(itemId, accountId, { status: PostStatus.REMOVED })
    .then((updateItem) => {
      console.log('Updated : ');
      console.dir(updateItem);
      console.dir(updateItem.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully removed post',
      });
    })
    .catch((err) => {
      console.log('Post removal error: ');
      console.dir(err);
      let errorMessage = 'Post could not be removed.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};


export {
  getPostsEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
};
