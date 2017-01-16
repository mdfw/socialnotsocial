import mongoose, { Schema } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { isEmail } from 'validator';
import crypto from 'crypto';
import { idier, passGen } from '../../../shared/helpers/idier';

const AccountType = {
  NORMAL: 'normal',
  ADMIN: 'admin',
  CUSTSERVICE: 'custservice',
  BANNED: 'banned',
};

/* Account schema represents all accounts, even those created by adding an email address.
 * An account can be created by signing up.
 * Note: We are not using the pepperId yet, there's only one pepper
 */
const accountSchema = new Schema({
  accountId: {
    type: Schema.Types.Number,
    unique: true,
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
    validate: [isEmail, 'You must provide a valid email.'],
  },
  displayName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  passwordPepperId: {
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
});

/* Encrypting a password.
   Follows dropbox's pattern of hashing, bcrypting, then encrypting.
   Seems safer: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
   */
accountSchema.pre('save', function presave(next, done) {
  /* check if it's new password or update one so we don't touch it */
  if (!this.isModified('password')) next();

  /* A password is not technically required for an account to be valid. */
  if (!this.password) next();

  /* TODO: Deal better with errors in the encrypt and decrypt steps */
  const self = this;
  Promise.resolve(self.password).then(function hashThePassword(passwordToHash) {
    return self.hashPassword(passwordToHash);
  })
  .then(function bcryptTheHash(hashedPassword) {
    return self.bcryptHash(hashedPassword);
  })
  .then(function aesTheHash(bcryptedPassword) {
    return self.aesHash(bcryptedPassword);
  })
  .then(function setEncrypted(encrytpedPassword) {
    self.password = encrytpedPassword;
    next();
  })
  .catch(function encryptionFailure(err) {
    done(new Error(err));
  });
});

/* If it's a new account, create an accountID and loginToken for it. */
accountSchema.pre('validate', function preAccountValidate(next) {
  if (!this.accountId) {
    this.accountId = idier();
  }
  if (!this.loginToken) {
    this.loginToken = passGen();
  }
  next();
});


/* Compare passwords.
 * Because we are using hashing and encrypting, we have to do that before we compare.
 */
accountSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // compare the submitted password to encrypted password in database.
  const candidateHashed = this.hashPassword(candidatePassword);
  const decryptedPass = this.deAesHash(this.password);
  compare(candidateHashed, decryptedPass, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};

/* Hashes the password into a SHA512 hex hash */
accountSchema.methods.hashPassword = function hashPassword(password) {
  const hasher = crypto.createHash('sha512');
  hasher.update(password);
  const hashed = hasher.digest('hex');
  return hashed;
};

/* Bcrypts a string (expects a hash) with 10 rounds and a per user salt
 * Salt is returned as part of the hash and thus saved.
 * Note that this version of bcrypt only takes the first 72 characters.
  */
accountSchema.methods.bcryptHash = function bcryptHash(passwordhash) {
  const saltRounds = 10;
  return hash(passwordhash, saltRounds);
};

/* Encrypts the bcrypted string using aes256 using a pepper stored
 *   in the environment. This is what should be finally saved.
 */
accountSchema.methods.aesHash = function aesHash(passwordhash) {
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
accountSchema.methods.deAesHash = function deAesHash(passwordhash) {
  const pepper = process.env.ACCOUNT_ENCRYPTION_PEPPER;
  const algorithm = 'aes-256-ctr';
  const decipher = crypto.createDecipher(algorithm, pepper);
  let decrypted = decipher.update(passwordhash, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

/* Compile the schema into a model
 * http://mongoosejs.com/docs/models.html
 */
const Account = mongoose.model('Account', accountSchema);

export { AccountType, Account};
