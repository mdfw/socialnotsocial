import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { appraiseEmail } from '../../shared/helpers/appraise';
import { RecipientType, RecipientStatus, MAX_POST_SEARCH_RETURN_LIMIT } from './constants';

/* A recipient is a person or system where posts will be sent.
 */
module.exports = (sequelize, DataTypes) => {
  const Recipient = sequelize.define(
    'Recipient', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [RecipientType.EMAIL,
          RecipientType.TEXT,
          RecipientType.POST,
          RecipientType.FACEBOOK,
        ],
        defaultValue: RecipientType.EMAIL,
      },
      status: {
        type: DataTypes.ENUM,
        values: [RecipientStatus.ACTIVE,
          RecipientStatus.VALIDATING,
          RecipientStatus.REMOVED,
          RecipientStatus.BOUNCING,
          RecipientStatus.UNSUBSCRIBED,
        ],
        defaultValue: RecipientStatus.ACTIVE,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidEmail: function validateEmail(value) {
            const appraisalMessages = appraiseEmail(value);
            if (appraisalMessages.length > 0) {
              throw new Error(appraisalMessages.join(' '));
            }
          },
        },
      },
      validatedAt: {
        type: DataTypes.DATE,
        field: 'validated_at',
      },
      validated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      unsubscribedAt: {
        type: DataTypes.DATE,
        field: 'unsubscribed_at',
      },
      unsubscribedReason: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'email'],
        },
      ],
      hooks: {
        beforeValidate: function addId(recipient) {
          if (!recipient.id) {
            recipient.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          Recipient.belongsTo(models.User, {
            foreignKey: {
              field: 'user_id',
              allowNull: false,
            },
            onDelete: 'cascade',
          });
          Recipient.hasMany(models.Apprisal);
        },
      },
    },
  );

  /* Find all recipients for a userId
   * @param {string} userId - the userId to search for
   * @param {number} limit - the number to find.
   * @param {number} offset - The number to skip.
   * @param {number} beforeId - the identifier to sort before. If this is passed, limit is used.
   */
  Recipient.findAllForUser = function findAllForUser(userId, limit = 20, offset = 0, beforeId) {
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
  Recipient.totalForUser = function countAll(userId) {
    return Recipient.findAndCountAll({
      where: { user_id: userId },
    });
  };

  /* Update a Recipient
   * @param {number} - id: The id of the post
   * @param {number} - userId: The id of the user
   * @param {object} - updates: The fields and values to update
   * Returns: Either an updated post or null if it couldn't be found
   */
  Recipient.updateRecipient = function updatePost(id, userId, updates) {
    return Recipient.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => {
      if (!foundItem) {
        return null;
      }
      const foundRecipient = foundItem;
      const fieldsToUpdateKeys = Object.keys(updates);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundRecipient[key] = updates[key];
      });
      return foundRecipient.save();
    });
  };

  /* Delete a Recipient
   * @param {number} - id: The id of the post
   * @param {number} - userId: The id of the user
   * Returns: Either an deleted post or null if it couldn't be found
   */
  Recipient.deleteRecipient = function updatePost(id, userId) {
    return Recipient.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => { // eslint-disable-line consistent-return
      if (!foundItem) {
        return null;
      }
      const foundRecipient = foundItem;
      foundRecipient.status = RecipientStatus.REMOVED;
      return foundRecipient.save();
    })
    .then((thisRecipient) => { // eslint-disable-line arrow-body-style
      return thisRecipient.destroy();
    });
  };

  return Recipient;
};
