import mongoose, { Schema } from 'mongoose';
import { encryptPassword, passwordsMatch } from './passwordEncryption';
import { idier } from '../../../shared/helpers/idier';
import { appraiseEmail, appraiseDisplayName, appraisePassword } from '../../../shared/helpers/appraise';

/* The various states an account can be in. Used in the schema for account.accountType.
 */
const AccountType = {
  NORMAL: 'normal',
  ADMIN: 'admin',
  CUSTSERVICE: 'custservice',
  BANNED: 'banned',
};

/* Account schema represents all accounts.
 * Note: We are not using the pepperId yet, there's only one pepper
 */
const AccountSchema = new Schema({
  accountId: {
    type: Schema.Types.Number,
    unique: true,
    required: true,
  },
  accountType: {
    type: String,
    enum: [AccountType.NORMAL, AccountType.ADMIN, AccountType.CUSTSERVICE, AccountType.BANNED],
    default: AccountType.NORMAL,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  encryptedPasswordHash: {
    type: String,
    trim: true,
    required: true,
  },
  encryptedPasswordPepperId: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateAccountValidated: {
    type: Date,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

/* Remove password and pepper from exported json && object
 * Based on: http://ksloan.net/tips-for-using-mongoose-schemas-with-express-mongo-express-node-stack/
 */
AccountSchema.set('toJSON', {
  transform: function transformJSON(doc, objRepresentation) {
    delete objRepresentation.encryptedPasswordHash;  // eslint-disable-line no-param-reassign
    delete objRepresentation.passwordEncryptionPepperId;  // eslint-disable-line no-param-reassign
    return objRepresentation;
  },
});
AccountSchema.set('toObject', {
  transform: function transformObject(doc, objRepresentation) {
    delete objRepresentation.encryptedPasswordHash;  // eslint-disable-line no-param-reassign
    delete objRepresentation.passwordEncryptionPepperId;  // eslint-disable-line no-param-reassign
    return objRepresentation;
  },
});

/* Sets the account password (technically, encryptedPasswordHash)
 * Sends the password through hashing and encryption and saves it the the database.
 * returns {Promise}
 */
AccountSchema.methods.setPassword = function setPassword(password) {
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
      console.log('Got encrypted value: ');
      console.dir(encryptedValue);
      self.encryptedPasswordHash = encryptedValue.encrypted;
      self.encryptedPasswordPepperId = encryptedValue.pepperId;
    })
    .catch((err) => {
      throw err;
    });
};

/* If we don't have an accountID (say, on a new account), set one. */
AccountSchema.pre('validate', function preValidateAddAccountId(next) {
  if (!this.accountId) {
    this.accountId = idier();
  }
  next();
});

/* Update the dateUpdated field on save. */
AccountSchema.pre('save', true, function updateDate(next, done) {
  this.dateUpdated = new Date();
  next();
  done();
});

/* Does the pre-save validations.
 * Why here instead of on each individual field? Allows us to return multiple errors at once.
 */
AccountSchema.pre('save', true, function preSaveValidations(next, done) {
  const errorMessages = [];
  const emailAppraisal = appraiseEmail(this.email);
  if (emailAppraisal.length > 0) {
    this.invalidate('email', emailAppraisal.join(', '));
    errorMessages.push(emailAppraisal.join(', '));
  }

  const displayNameAppraisal = appraiseDisplayName(this.displayName);
  if (displayNameAppraisal.length > 0) {
    this.invalidate('displayName', displayNameAppraisal.join(', '));
    errorMessages.push(displayNameAppraisal.join(' '));
  }
  if (errorMessages.length > 0) {
    done(new Error(errorMessages.join(' ')));
  }
  next();
  done();
});

AccountSchema.methods.comparePassword = function comparePasswords(candidate, callback) {
  passwordsMatch(candidate, this.encryptedPasswordHash, this.encryptedPasswordPepperId, (err, isMatch) => { // eslint-disable-line max-len
    if (err) callback(err);
    callback(null, isMatch);
  });
};

/* Can this account act on behalf of another account?
 * @param {number} *ignored* the Account id to check against.
 * @returns {bool} true if account can act on behalf of accountId
 * @note Currently, only checks if this account has an account type of admin or customer service
*/
AccountSchema.methods.canActOnBehalfOf = function canActOnBehalfOf(accountId) {  // eslint-disable-line
  if (this.accountType === AccountType.ADMIN
    || this.accountType === AccountType.CUSTSERVICE) {
    return true;
  }
  return false;
};

/* Compile the schema into a model
 * http://mongoosejs.com/docs/models.html
 */
const Account = mongoose.model('Account', AccountSchema);

export default Account;
