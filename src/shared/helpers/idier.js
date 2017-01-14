import Base58 from 'base58';
import generator from 'generate-password';

/* idier: identifier generator. Inspired by twitter's snowflake system
 * https://blog.twitter.com/2010/announcing-snowflake : "To generate the roughly-sorted
 *   64 bit ids in an uncoordinated manner, we settled on a composition of:
 *   timestamp, worker number and sequence number."
 * This substitutes a random number for the sequence number. If we really need the ordering
 * that a sequence gives, we can add later and we have a good problem.
 */

const idier = function idier() {
  let sequence = 1;
  if (global.idierSequence && global.idierSequence < 1000 && global.iderSequence > 0) {
    sequence = global.idierSequence;
  } else {
    global.iderSequence = sequence;
  }
  const myId = process.env.IDIER_WORKER_ID;
  const timeStamp = Math.floor(Date.now() / 1000);
  const randomnumber = Math.floor(Math.random() * 10);
  const snowflake = `${timeStamp}${myId}${sequence}${randomnumber}`;
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
