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
   * @param {number} - accountId
   */
  Post.totalForUser = function countPosts(userId) {
    return Post.findAndCountAll({
      where: { UserId: userId },
    });
  };

  Post.updatePost = function updatePost(id, userId, updates) {
    Post.findById(id)
    .then((foundItem) => {
      const foundPost = foundItem;
      const fieldsToUpdateKeys = Object.keys(updates);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundPost[key] = updates[key];
      });
      return foundPost.save();
    });
  };

  return Post;
};
