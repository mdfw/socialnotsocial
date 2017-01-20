import mongoose, { Schema } from 'mongoose';
import { idier } from '../../../shared/helpers/idier';

/* The maximum we can return from a search */
const MAX_RETURN_LIMIT = 100;

/* Enum for the post.status field */
const PostStatus = {
  DRAFT: 'draft',
  POSTED: 'posted',
  REMOVED: 'removed',
};

/* Post schema represents all posts.
 * https://developers.facebook.com/docs/graph-api/reference/v2.8/post
 */
const PostSchema = new Schema({
  status: {
    type: Schema.Types.String,
    default: PostStatus.POSTED,
    enum: [
      PostStatus.DRAFT,
      PostStatus.POSTED,
      PostStatus.REMOVED,
    ],
  },
  postId: {
    type: Schema.Types.Number,
    unique: true,
    required: true,
  },
  message: {
    type: Schema.Types.String,
    required: true,
  },
  subject: {
    type: Schema.Types.String,
  },
  photoIds: {
    type: Schema.Types.Array,
  },
  ownerAccountId: {
    type: Schema.Types.Number,
    required: true,
    index: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

/* If it's a new post, create an postId for it. */
PostSchema.pre('validate', function preValidatePost(next) {
  if (!this.postId) {
    this.postId = idier();
  }
  next();
});

/* Update the dateUpdated field on save. */
PostSchema.pre('save', true, function updatePostDate(next, done) {
  this.dateUpdated = new Date();
  next();
  done();
});

/*
 * Based on: http://ksloan.net/tips-for-using-mongoose-schemas-with-express-mongo-express-node-stack/
 */
PostSchema.set('toJSON', {
  transform: function transformJSON(doc, objRepresentation) {
    return {
      postId: objRepresentation.postId,
      message: objRepresentation.message,
      subject: objRepresentation.subject,
      photoIds: objRepresentation.photoIds,
      ownerAccountId: objRepresentation.ownerAccountId,
      dateCreated: objRepresentation.dateCreated,
      dateUpdated: objRepresentation.dateUpdated,
      status: objRepresentation.status,
    };
  },
});

/* Find a post by an postId
 * @param {number} postId - the post identifier
 * @returns {promise} - a promise to find something
 */
PostSchema.statics.findOnePost = function findPostById(postId) {
  return this.findOne({ postId: postId }).exec();
};

/* Find a post by an postId and update the appropriate fields.
 * @param {number} recipientId - the recipient id
 * @param {number} ownerId - the owner id
 * @param {object} fieldsToUpdate - the fields and their values to update to.
 * @returns {promise} - a promise to find and update something
 * @note: We do it this way instead of findOneAndUpdate because update and valdiation hooks are
 *   not called on findOneAndUpdate.
 */
PostSchema.statics.update = function updatePostById(postId, ownerId, fieldsToUpdate) {
  return this.findOne({ postId: postId, ownerAccountId: ownerId }).exec()
    .then((foundItem) => {
      const foundPost = foundItem;
      const fieldsToUpdateKeys = Object.keys(fieldsToUpdate);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundPost[key] = fieldsToUpdate[key];
      });
      return foundPost.save();
    });
};

/* Find all posts for an accountId
 * @param {string} accountId - the accountId to search for
 * @param {number} limit - the number to find.
 * @param {number} beforeId - the identifier to sort before. If this is passed, limit is used.
 * @returns {promise} - a promise to find something
 */
PostSchema.statics.findAllForId = function allPosts(accountId, limit = 20, beforeId) {
  let limiter = limit;
  if (limiter > MAX_RETURN_LIMIT) limiter = MAX_RETURN_LIMIT;

  if (beforeId) {
    return this.find({ ownerAccountId: accountId, postId: { $lte: beforeId } }).limit(limiter).sort('-postId').exec();
  }
  return this.find({ ownerAccountId: accountId }).limit(limiter).exec();
};

/* Determine total number of posts for account
 * @param {number} - accountId
 */
PostSchema.statics.totalForAccountId = function countPosts(accountId) {
  return this.count({ ownerAccountId: accountId }).exec();
};

/* Compile the schema into a model
 * http://mongoosejs.com/docs/models.html
 */
const Post = mongoose.model('Post', PostSchema);

export { Post, PostStatus };
