import mongoose, { Schema } from 'mongoose';
import { compare, hash } from 'bcrypt';
import crypto from 'crypto';
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
  passwordEncryptionPepperId: {
    type: String,
    default: '1',
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
      return self.encryptPassword(passwordValue);
    })
    .then((encryptedValue) => {
      self.encryptedPasswordHash = encryptedValue;
    })
    .catch((err) => {
      throw err;
    });
};

/* Returns the unencrypted version of the passwordHash */
AccountSchema.virtual('passwordHash')
.get(function getPasswordHash() {
  this.deAesHash(this.encryptedPasswordHash);
});

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

/* Encrypting a password.
   Follows dropbox's pattern of hashing, bcrypting, then encrypting.
   Seems safer: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
   */
AccountSchema.methods.encryptPassword = function encryptPassword(rawPassword) {
  /* TODO: Deal better with errors in the encrypt and decrypt steps */
  const self = this;
  console.log(`Account:: encryptPassword with ${rawPassword}`);
  return new Promise(function sendPasswordToHash(resolve) {
    resolve(rawPassword);
  })
  .then(function hashThePassword(passwordToHash) {
    return self.hashPassword(passwordToHash);
  })
  .then(function bcryptTheHash(hashedPassword) {
    return self.bcryptHash(hashedPassword);
  })
  .then(function aesTheHash(bcryptedPassword) {
    return self.aesHash(bcryptedPassword);
  })
  .then(function setEncrypted(encrytpedPassword) {
    return encrytpedPassword;
  })
  .catch(function encryptionFailure(err) {
    return new Error(err);
  });
};


/* Hashes the password into a SHA512 hex hash */
AccountSchema.methods.hashPassword = function hashPassword(password) {
  const hasher = crypto.createHash('sha512');
  hasher.update(password);
  const hashed = hasher.digest('hex');
  return hashed;
};

/* Bcrypts a string (expects a hash) with 10 rounds and a per user salt
 * Salt is returned as part of the hash and thus saved.
 * Note that this version of bcrypt only takes the first 72 characters.
  */
AccountSchema.methods.bcryptHash = function bcryptHash(passwordhash) {
  const saltRounds = 10;
  return hash(passwordhash, saltRounds);
};

/* Encrypts the bcrypted string using aes256 using a pepper stored
 *   in the environment. This is what should be finally saved.
 */
AccountSchema.methods.aesHash = function aesHash(passwordhash) {
  const pepper = process.env.ACCOUNT_ENCRYPTION_PEPPER;
  const algorithm = 'aes-256-ctr';
  const cipher = crypto.createCipher(algorithm, pepper);
  let crypted = cipher.update(passwordhash, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

/* Decrypts the encrypted bcrypt hash using aes256 using a pepper stored
 *   in the environment. Should use this only with the bcrypted, hashed password.
 */
AccountSchema.methods.deAesHash = function deAesHash(passwordhash) {
  const pepper = process.env.ACCOUNT_ENCRYPTION_PEPPER;
  const algorithm = 'aes-256-ctr';
  const decipher = crypto.createDecipher(algorithm, pepper);
  let decrypted = decipher.update(passwordhash, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

/* Compare passwords.
 * Because we are using hashing and encrypting, we have to do that before we compare.
 */
AccountSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // compare the submitted password to encrypted password in database.
  const candidateHashed = this.hashPassword(candidatePassword);
  const decryptedPass = this.deAesHash(this.password);
  compare(candidateHashed, decryptedPass, (err, isMatch) => {
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
