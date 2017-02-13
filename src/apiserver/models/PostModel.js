import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { PostStatus, MAX_POST_SEARCH_RETURN_LIMIT } from './constants';

/* A post is the atomic messages of the user
 * https://developers.facebook.com/docs/graph-api/reference/v2.8/post
 */
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: [PostStatus.DRAFT, PostStatus.POSTED, PostStatus.REMOVED],
        defaultValue: PostStatus.POSTED,
      },
      message: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      edited: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeValidate: function addId(post) {
          if (!post.id) {
            post.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          Post.belongsTo(models.User, {
            foreignKey: {
              field: 'user_id',
              allowNull: false,
            },
            onDelete: 'cascade',
          });
          Post.belongsToMany(models.Media, { through: 'PostMedia' });
          Post.hasMany(models.Apprisal);
        },
      },
    },
  );

  /* Find all posts for a userId
   * @param {string} userId - the userId to search for
   * @param {number} limit - the number to find.
   * @param {number} offset - The number to skip.
   * @param {number} beforeId - the identifier to sort before. If this is passed, limit is used.
   */
  Post.findAllForUser = function findAllForUser(userId, limit = 20, offset = 0, beforeId) {
    if (!userId) {
      throw new Error('No userId provided');
    }

    const userWhere = `"user_id": "${userId}"`;

    let beforeIdWhere = '';
    if (beforeId && beforeId > 0) {
      beforeIdWhere = `, id : {$lt: ${beforeId}}`;
    }

    let limiter = limit;
    if (limiter > MAX_POST_SEARCH_RETURN_LIMIT) {
      limiter = MAX_POST_SEARCH_RETURN_LIMIT;
    }
    const limitClause = `, "limit": "${limiter}", `;
    let offsetClause = '';
    if (offset > 0) {
      offsetClause = `, "offset": "${offset}", `;
    }
    const orderClause = '"order": "id DESC"';
    const queryJSON = `{ "where": { ${userWhere}${beforeIdWhere} }${limitClause}${offsetClause} ${orderClause}}`;
    const query = JSON.parse(queryJSON);
    return this.findAll(query);
  };

  /* Determine total number of posts for account
   * @param {number} - userId
   */
  Post.totalForUser = function countPosts(userId) {
    return Post.findAndCountAll({
      where: { user_id: userId },
    });
  };

  /* Update a post
   * @param {number} - id: The id of the post
   * @param {number} - userId: The id of the user
   * @param {object} - updates: The fields and values to update
   * Returns: Either an updated post or null if it couldn't be found
   */
  Post.updatePost = function updatePost(id, userId, updates) {
    return Post.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => {
      if (!foundItem) {
        return null;
      }
      const foundPost = foundItem;
      const fieldsToUpdateKeys = Object.keys(updates);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundPost[key] = updates[key];
      });
      return foundPost.save();
    });
  };

  /* Delete a post
   * @param {number} - id: The id of the post
   * @param {number} - userId: The id of the user
   * Returns: Either an deleted post or null if it couldn't be found
   */
  Post.deletePost = function updatePost(id, userId) {
    return Post.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => { // eslint-disable-line consistent-return
      if (!foundItem) {
        return null;
      }
      const foundPost = foundItem;
      foundPost.status = PostStatus.REMOVED;
      return foundPost.save();
    })
    .then((thisPost) => { // eslint-disable-line arrow-body-style
      return thisPost.destroy();
    });
  };

  return Post;
};
