import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { appraiseEmail } from '../../shared/helpers/appraise';
import { RecipientType, RecipientStatus } from './constants';

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
        unique: true,
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
  return Recipient;
};
