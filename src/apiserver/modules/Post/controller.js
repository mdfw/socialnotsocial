import { models } from '../../models';
import { proxyUserId } from '../Authentication';

const Post = models.Post;
const Apprisal = models.Apprisal;


/* Get all of the posts for the userId.
 * Params needed in req.body:
 *   @param {number=} onBehalfOfId - (optional) The userId to act on behalf of if current user
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the userId to search user.
 */
const getPostsEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Post.findAllForUser(
    userId,
    {
      includeTables:
      [{
        model: Apprisal,
      }],
    })
    .then((items) => {
      const cleanedItems = items.map(function jsonify(mappedItem) {
        return mappedItem.toJSON();
      });
      res.status(200).json({
        success: true,
        posts: cleanedItems,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(404).end();
    });
};

/* Get a specific post for userId.
 * Params needed in req.body:
 *   @param {number=} onBehalfOfId - (optional) The userId to act on behalf of if current user
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the userId to search user.
 *  @param {string} postId - the post to search for can be in body or params
 */
const getAPostEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let postId = req.params.postId;
  if (req.body.postId) {
    postId = req.body.postId;
  }
  if (!postId) {
    res.statusMessage = 'No post id provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Post.findOne({ where: { id: postId, user_id: userId } })
    .then((item) => {
      if (!item) {
        res.statusMessage = 'Post was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(200).json({
        success: true,
        post: item.toJSON(),
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(404).end();
    });
};

/* Adds a post to the Post database based on the fields passed in.
 * Params needed in req.body:
 *   @param {string} message - the main message body
 *   @param {array[number]} mediaIds - the mediaIds associated with this post.
 *   @param {string=} status (optional) - Must be one of PostStatus (see Post model).
 *   @param (number=} onBehalfOfId - (optional) The userId to act on behalf of if current user
 *      can act on behalf of it.
 *  Uses proxyUserId() to get the userId to post under.
 */
const addPostEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  const { message, status, mediaIds } = req.body;
  const newPost = Post.build({
    message: message,
    status: status,
    user_id: userId,
  });
  let createdId = null;
  newPost.save()
    .then((createdItem) => {
      createdId = createdItem.id;
      console.log('created item');
      console.dir(createdItem);
      if (mediaIds && mediaIds.length > 0) {
        return createdItem.setMedia(mediaIds);
      }
      console.log('Got here, but maybe should not have');
      return createdItem;
    })
    .then(() => {
      console.log('We set media, now for find and associate');
      return Post.find({
        where: { id: createdId },
      });
    })
    .then((createdItem) => {
      console.log('created item');
      console.dir(JSON.stringify(createdItem));
      const cleanedPost = createdItem.toJSON();
      res.status(201).json({
        success: true,
        message: 'Successfully created post',
        post: cleanedPost,
      });
    })
    .catch((err) => {
      let errorMessage = 'Post could not be created.';
      if (err.code === 11000) {
        errorMessage = 'Post already exists';
      } else if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Updates a post
 *   @param {string} message - the main message body
 *   @param {array[number]} mediaIds - the mediaIds associated with this post.
 *   @param {string=} status (optional) - Must be one of PostStatus (see Post model).
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
 *  Uses proxyUserId() to get the userId to map.
 */
const updatePostEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.statusMessage = 'No post id provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  const { message, mediaIds, status } = req.body;
  const updates = {};
  if (message && message.length > 0) updates.message = message;
  if (status && status.length > 0) updates.status = status;
  if (mediaIds && mediaIds.length > 0) updates.mediaIds = mediaIds;

  if (Object.keys(updates).length === 0) {
    res.statusMessage = 'Nothing to update'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Post.updatePost(itemId, userId, updates)
    .then((updatedItem) => {
      if (!updatedItem) {
        res.statusMessage = 'Post was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Successfully updated post',
        post: updatedItem.toJSON(),
      });
    })
    .catch((err) => {
      console.dir(err);
      let errorMessage = 'Post could not be updated.';
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
const removePostEndpoint = (req, res) => {
  const userId = proxyUserId(req);
  if (!userId) {
    res.statusMessage = 'No user provided'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  let itemId = req.params.postId;
  if (req.body.postId) {
    itemId = req.body.postId;
  }
  if (!itemId) {
    res.statusMessage = 'No postId provided.'; // eslint-disable-line no-param-reassign
    res.status(422).end();
  }
  Post.deletePost(itemId, userId)
    .then((updatedItem) => {
      if (!updatedItem) {
        res.statusMessage = 'Post was not found.'; // eslint-disable-line no-param-reassign
        res.status(404).end();
        return;
      }
      res.status(204).end();
    })
    .catch((err) => {
      let errorMessage = 'Post could not be removed.';
      if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};


export {
  getPostsEndpoint,
  getAPostEndpoint,
  addPostEndpoint,
  updatePostEndpoint,
  removePostEndpoint,
};
