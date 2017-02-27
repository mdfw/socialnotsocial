import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { MAX_POST_SEARCH_RETURN_LIMIT } from './constants';

/* An apprisal is an actual notification sent to a user or system of a new post.
 * Has an association with the Post object and the recipient that it will be sent to.
 * This would be called a notification in another system, but we are reserving that for future use.
 */
module.exports = (sequelize, DataTypes) => {
  const Apprisal = sequelize.define(
    'Apprisal', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      deliveredAt: {  // The date the item was either sent or pushed to service
        type: DataTypes.DATE,
        field: 'delivered_at',
      },
      firstOpenedAt: {  // This only applies to emails with trackers. When the email was viewed.
        type: DataTypes.DATE,
        field: 'first_opened_at',
      },
      firstViewedAt: {  // When this item was viewed on site.
        type: DataTypes.DATE,
        field: 'first_viewed_at',
      },
      canRespond: { // Can the recipient of this apprisal respond? Overrides canRespond on recipient
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'can_respond',
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeValidate: function addId(apprisal) {
          if (!apprisal.id) {
            apprisal.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          Apprisal.belongsTo(models.Post, {
            foreignKey: {
              field: 'post_id',
              allowNull: false,
            },
            onDelete: 'cascade',
          });
          Apprisal.belongsTo(models.Recipient, {
            foreignKey: {
              field: 'recipient_id',
              allowNull: false,
            },
            onDelete: 'cascade',
          });
          Apprisal.belongsTo(models.User, {
            foreignKey: {
              field: 'user_id',
              allowNull: false,
            },
            onDelete: 'cascade',
          });
        },
      },
    },
  );

    /* Find all apprisals for a userId
   * @param {string} userId - the userId to search for
   * @param {number} limit - the number to find.
   * @param {number} offset - The number to skip.
   * @param {number} beforeId - the identifier to sort before. If this is passed, limit is used.
   */
  Apprisal.findAllForUser = function findAllForUser(userId, limit = 20, offset = 0, beforeId) {
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

  /* Determine total number of apprisals for user
   * @param {number} - userId
   */
  Apprisal.totalForUser = function countAll(userId) {
    return Apprisal.findAndCountAll({
      where: { user_id: userId },
    });
  };

  /* Update an Apprisal
   * @param {number} - id: The id of the item
   * @param {number} - userId: The id of the user
   * @param {object} - updates: The fields and values to update
   * Returns: Either an updated apprisal or null if it couldn't be found
   */
  Apprisal.updateApprisal = function updateApprisal(id, userId, updates) {
    return Apprisal.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => {
      if (!foundItem) {
        return null;
      }
      const foundApprisal = foundItem;
      const fieldsToUpdateKeys = Object.keys(updates);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundApprisal[key] = updates[key];
      });
      return foundApprisal.save();
    });
  };

  /* Delete an Apprisal
   * @param {number} - id: The id of the item
   * @param {number} - userId: The id of the user
   * Returns: Either an deleted apprisal or null if it couldn't be found
   */
  Apprisal.deleteApprisal = function deleteApprisal(id, userId) {
    return Apprisal.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => { // eslint-disable-line consistent-return
      if (!foundItem) {
        return null;
      }
      const foundApprisal = foundItem;
      return foundApprisal.save();
    })
    .then((thisApprisal) => { // eslint-disable-line arrow-body-style
      return thisApprisal.destroy();
    });
  };

  return Apprisal;
};

