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

/* Encrypts the input using aes256 using a pepper stored
 *   in the environment. This is what should be finally saved.
 */
const aesHash = function aesHash(toEncrypt, pepperId = process.env.ACCOUNT_ENCRYPT_CURRENT_PEPPER) {
  const currentPepperId = pepperId;
  if (!currentPepperId) {
    throw new Error('Could not encrypt item - no pepper information available');
  }
  const pepper = process.env[currentPepperId];
  if (!pepper) {
    throw new Error('Could not encrypt item - no pepper available');
  }
  const algorithm = 'aes-256-ctr';
  const cipher = crypto.createCipher(algorithm, pepper);
  let crypted = cipher.update(toEncrypt, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return { encrypted: crypted, pepperId: currentPepperId };
};

/* Encrypting a password.
   Follows dropbox's pattern of hashing, bcrypting, then encrypting.
   Seems safer: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
*/
const encryptPassword = function encryptPassword(rawPassword) {
  return Promise.resolve(rawPassword)
  .then(hashPassword)
  .then(bcryptHash)
  .then(aesHash);
};

/* Decrypts an encrypted value using aes256 using a pepper stored
 *   in the environment.
 */
const deAesHash = function deAesHash(toDecrypt, pepperId) {
  const pepper = process.env[pepperId];
  if (!pepper) {
    return new Error('Pepper not found.');
  }
  const algorithm = 'aes-256-ctr';
  const decipher = crypto.createDecipher(algorithm, pepper);
  let decrypted = decipher.update(toDecrypt, 'hex', 'utf8');
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
