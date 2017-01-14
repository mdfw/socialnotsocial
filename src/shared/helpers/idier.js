import Base58 from 'base58';
import generator from 'generate-password';

/* idier: identifier generator. Inspired by twitter's snowflake system
 * https://blog.twitter.com/2010/announcing-snowflake
 * We use the timestamp converted to seconds + a worker id from the environment +
 *   a sequence number (see below) + a single random number just in case...
 */
const idier = function idier() {
  /* The sequence is stored on the global object. The sequence should be between 1-999 to keep
   *   our total id number in the right space to be converted.
   *   Note: There's probably an opportunity to use Redis or similar for the sequence.
   */
  let mySequence = 1;
  const globalSeq = GLOBAL.idierSequence;
  if (globalSeq && globalSeq < 1000 && globalSeq > 0) {
    mySequence = globalSeq;
    GLOBAL.idierSequence += 1;
  } else {
    GLOBAL.idierSequence = mySequence + 1;
  }

  const workerId = process.env.IDIER_WORKER_ID;
  const timeStamp = Math.floor(Date.now() / 1000);
  const randomnumber = Math.floor(Math.random() * 10);
  const snowflake = `${timeStamp}${workerId}${mySequence}${randomnumber}`;
  return snowflake;
};

/* toHumanId - transform a number into a base58 encoded string for use in human visible tokens.
   Uses https://www.npmjs.com/package/base58
  */
const toHumanId = function toHumanId(idNumber) {
  const encoded = Base58.encode(idNumber);
  return encoded;
};

/* toNumbericId - transform a humanId (base32 encoded) string to a number to use by the computer.
  */
const toNumericId = function toNumericId(idString) {
  const decoded = Base58.decode(idString);
  return decoded;
};


/* Password generator
 * Creates a 12 digit password with letters and numbers.
*/
const passGen = function passGen() {
  const password = generator.generate({
    length: 12,
    numbers: true,
  });
  return password;
};

export { idier, toHumanId, toNumericId, passGen };
