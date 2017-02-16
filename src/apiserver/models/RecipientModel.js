import { idier, passGen } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { appraiseEmail } from '../../shared/helpers/appraise';
import { deAesHash, aesHash } from './passwordEncryption';
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
      // Each recipient gets an access token. Combined with Apprisal.id, makes for the link
      // Advantage: if the token is stolen, can be recomputed and renders all apprisals with this
      //   token invalid. Encrypted because if db hacked, could be used to see all data. (issue?)
      accessTokenEncrypted: {
        type: DataTypes.STRING,
        field: 'access_token_hash',
        allowNull: false,
      },
      // Pepper for the AES string used in the accessToken Encryption.
      accessTokenPepper: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Can a user respond? This can be overridden by Apprisals
      canRespond: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
          if (!recipient.accessToken) {
            const token = passGen(15, true, '.');
            console.log(`Recipient token: ${token}`);
            recipient.setAccessToken(token); // eslint-disable-line no-param-reassign
          }
          if (recipient.type === RecipientType.FACEBOOK) {
            recipient.canRespond = false; // eslint-disable-line no-param-reassign
          }
        },
      },
      instanceMethods: {
        setAccessToken: function setAccessToken(token) {
          const self = this;
          if (!token || token.length < 15) {
            throw new Error('Invalid token passed to recipient. This is an internal error.');
          }
          const encryptedValue = aesHash(token, process.env.TOKEN_ENCRYPT_CURRENT_PEPPER);
          self.accessTokenEncrypted = encryptedValue.encrypted;
          self.accessTokenPepper = encryptedValue.pepperId;
        },
        getAccessToken: function getAccessToken() {
          const self = this;
          return deAesHash(
            self.accessTokenEncrypted,
            self.accessTokenPepper,
          );
        },
        toJSON: function stripValues() {
          const values = Object.assign({}, this.get());
          delete values.accessTokenEncrypted;
          delete values.accessTokenPepper;
          delete values.deletedAt;
          return values;
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

  /* Determine total number of recipients for user
   * @param {number} - userId
   */
  Recipient.totalForUser = function countAll(userId) {
    return Recipient.findAndCountAll({
      where: { user_id: userId },
    });
  };

  /* Update a Recipient
   * @param {number} - id: The id of the item
   * @param {number} - userId: The id of the user
   * @param {object} - updates: The fields and values to update
   * Returns: Either an updated recipient or null if it couldn't be found
   */
  Recipient.updateRecipient = function updateRecipient(id, userId, updates) {
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
   * @param {number} - id: The id of the item
   * @param {number} - userId: The id of the user
   * Returns: Either an deleted recipient or null if it couldn't be found
   */
  Recipient.deleteRecipient = function deleteRecipient(id, userId) {
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
