import { compare, hash } from 'bcrypt';
import crypto from 'crypto';

/* Hashes the password into a SHA512 hex hash */
const hashPassword = function hashPassword(password) {
  const hasher = crypto.createHash('sha512');
  hasher.update(password);
  const hashed = hasher.digest('hex');
  return hashed;
};

/* Bcrypts a string (expects a hash) with 10 rounds and a per user salt
 * Salt is returned as part of the hash and thus saved.
 * Note that this version of bcrypt only takes the first 72 characters.
  */
const bcryptHash = function bcryptHash(passwordhash) {
  const saltRounds = 10;
  return hash(passwordhash, saltRounds);
};

/* Encrypts the bcrypted string using aes256 using a pepper stored
 *   in the environment. This is what should be finally saved.
 */
const aesHash = function aesHash(passwordhash) {
  const currentPepperId = process.env.ACCOUNT_ENCRYPT_CURRENT_PEPPER;
  const pepper = process.env[currentPepperId];
  const algorithm = 'aes-256-ctr';
  const cipher = crypto.createCipher(algorithm, pepper);
  let crypted = cipher.update(passwordhash, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return { encrypted: crypted, pepperId: currentPepperId };
};

/* Encrypting a password.
   Follows dropbox's pattern of hashing, bcrypting, then encrypting.
   Seems safer: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
   */
const encryptPassword = function encryptPassword(rawPassword) {
  /* TODO: Deal better with errors in the encrypt and decrypt steps */
  console.log(`Account:: encryptPassword with ${rawPassword}`);
  return new Promise(function sendPasswordToHash(resolve) {
    resolve(rawPassword);
  })
  .then(function hashThePassword(passwordToHash) {
    return hashPassword(passwordToHash);
  })
  .then(function bcryptTheHash(hashedPassword) {
    return bcryptHash(hashedPassword);
  })
  .then(function aesTheHash(bcryptedPassword) {
    return aesHash(bcryptedPassword);
  })
  .catch(function encryptionFailure(err) {
    return new Error(err);
  });
};


/* Decrypts the encrypted bcrypt hash using aes256 using a pepper stored
 *   in the environment. Should use this only with the bcrypted, hashed password.
 */
const deAesHash = function deAesHash(passwordhash, pepperId) {
  const pepper = process.env[pepperId];
  if (!pepper) {
    return new Error('Pepper not found.');
  }
  const algorithm = 'aes-256-ctr';
  const decipher = crypto.createDecipher(algorithm, pepper);
  let decrypted = decipher.update(passwordhash, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};


/* Compare passwords.
 * Because we are using hashing and encrypting, we have to do that before we compare.
 */
const passwordsMatch = function passwordsMatch(
  candidatePassword,
  encryptedPasswordHash,
  pepperId,
  ) {
  // compare the submitted password to encrypted password in database.
  const candidateHashed = hashPassword(candidatePassword);
  const decryptedPass = deAesHash(encryptedPasswordHash, pepperId);
  return compare(candidateHashed, decryptedPass);
};

export { encryptPassword, deAesHash, hashPassword, bcryptHash, aesHash, passwordsMatch };
