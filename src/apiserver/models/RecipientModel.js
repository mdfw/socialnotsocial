import { idier } from '../../../shared/helpers/idier';
import { appraiseEmail } from '../../shared/helpers/appraise';

/* Enum for the Recipient.type field */
const RecipientType = {
  EMAIL: 'email',
  TEXT: 'text',
  FACEBOOK: 'facebook',
};
/* A recipient is a person or system where posts will be sent.
 */
const Recipient = (sequelize, DataTypes) => {
  const RecipientDefinition = sequelize.define(
    'Recipient', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        defaultValue: sequelize.literal("idier()"),
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [RecipientType.EMAIL, RecipientType.TEXT, RecipientType.REMOVED],
        defaultValue : RecipientType.EMAIL,        
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
      },
      unsubscribedAt:  {
        type: DataTypes.DATE,
      },
      unsubscribedReason: {
        type: DataTypes.STRING,
      }
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      classMethods: {
        associate: function associateModels(models) {
          Recipient.belongsTo(models.User);
          Recipient.hasMany(models.Apprisal);
        },
      },
    },
  );
  return RecipientDefinition;
};

export { Recipient, RecipientType };
