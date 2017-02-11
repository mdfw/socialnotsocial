import { encryptPassword, passwordsMatch } from './passwordEncryption';
import { appraisePassword, appraiseEmail, appraiseDisplayName } from '../../shared/helpers/appraise';
import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars

/* A type of user */
const UserType = {
  NORMAL: 'normal',
  ADMIN: 'admin',
  CUSTSERVICE: 'custservice',
  BANNED: 'banned',
  DEMO: 'demo',
};

/* A user is the core part of the system */
const UserDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      userType: {
        type: DataTypes.ENUM,
        values: [UserType.NORMAL, UserType.ADMIN, UserType.CUSTSERVICE, UserType.BANNED],
        defaultValue: UserType.NORMAL,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValidDisplayName: function validateDisplayName(value) {
            const appraisalMessages = appraiseDisplayName(value);
            if (appraisalMessages.length > 0) {
              throw new Error(appraisalMessages.join(' '));
            }
          },
        },
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
      encryptedPasswordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      encryptedPasswordPepperId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      validatedAt: {
        type: DataTypes.DATE,
        field: 'validated_at',
      },
    },
    {
      underscored: true,
      paranoid: true,
      hooks: {
        beforeValidate: function addId(user) {
          if (!user.id) {
            user.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      instanceMethods: {
        setPassword: function setPassword(password) {
          const self = this;
          return Promise.resolve(appraisePassword(password))
            .then(function checkAppraisal(appraisalMessages) {
              if (appraisalMessages.length > 0) {
                throw new Error(appraisalMessages.join(', '));
              }
              return password;
            })
            .then(function runHashing(passwordValue) {
              return encryptPassword(passwordValue);
            })
            .then((encryptedValue) => {
              self.encryptedPasswordHash = encryptedValue.encrypted;
              self.encryptedPasswordPepperId = encryptedValue.pepperId;
            })
            .catch((err) => {
              throw err;
            });
        },
        toJSON: function stripValues() {
          const values = Object.assign({}, this.get());
          delete values.encryptedPasswordHash;
          delete values.encryptedPasswordPepperId;
          delete values.deletedAt;
          delete values.userType;
          return values;
        },
        // TODO: We really need a profile table but this works for now.
        toProfile: function stripForProfile() {
          const values = Object.assign({}, this.get());
          delete values.encryptedPasswordHash;
          delete values.encryptedPasswordPepperId;
          delete values.email;
          delete values.deletedAt;
          return values;
        },
        comparePassword: function comparePass(candidate) {
          return passwordsMatch(
            candidate,
            this.encryptedPasswordHash,
            this.encryptedPasswordPepperId,
          );
        },
        canActOnBehalfOf: function behalfOf(accountId) { // eslint-disable-line no-unused-vars
          if (this.userType === UserType.ADMIN
            || this.userType === UserType.CUSTSERVICE) {
            return true;
          }
          return false;
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          User.hasMany(models.Post);
          User.hasMany(models.Recipient);
          User.hasMany(models.Media);
          User.hasMany(models.UserValidation);
        },
      },
    },
  );
  return User;
};

export { UserDefinition, UserType };
