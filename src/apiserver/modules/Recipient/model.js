import mongoose, { Schema } from 'mongoose';
import { appraiseEmail, appraiseDisplayName } from '../../../shared/helpers/appraise';
import { idier, passGen } from '../../../shared/helpers/idier';

const RecipientStatus = {
  VALIDATING: 'validating',
  ACTIVE: 'active',
  REMOVED: 'removed',
  BOUNCING: 'bouncing',
  UNSUBSCRIBED: 'unsubscribed',
};

/* Recipient schema represents all recipients for an account.
 */
const RecipientSchema = new Schema({
  status: {
    type: Schema.Types.String,
    default: RecipientStatus.ACTIVE,
    enum: [
      RecipientStatus.VALIDATING,
      RecipientStatus.ACTIVE,
      RecipientStatus.REMOVED,
      RecipientStatus.BOUNCING,
      RecipientStatus.UNSUBSCRIBED,
    ],
  },
  recipientId: {
    type: Schema.Types.Number,
    unique: true,
    required: true,
  },
  ownerAccountId: {
    type: Schema.Types.Number,
    required: true,
    index: true,
  },
  loginToken: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
  },
  phoneType: {
    type: String,
  },
  displayName: {
    type: String,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  dateRecipientValidated: {
    type: Date,
  },
  dateUnsubscribed: {
    type: Date,
  },
  unsubscriptionReason: {
    type: String,
  },
  dateRemoved: {
    type: Date,
  },
});

/* If it's a new recipient, create an recipientId and loginToken for it. */
RecipientSchema.pre('validate', function preValidateRecipient(next) {
  console.log('Called pre save recipient');
  if (!this.recipientId) {
    this.recipientId = idier();
  }
  if (!this.loginToken) {
    this.loginToken = passGen();
  }
  next();
});

/* Update the dateUpdated field on save. */
RecipientSchema.pre('save', true, function updateRecipientDate(next, done) {
  this.dateUpdated = new Date();
  next();
  done();
});

/* Does the pre-save validations.
 * Why here instead of on each individual field? Allows us to return multiple errors at once.
 */
RecipientSchema.pre('save', true, function preRecipientSaveValidations(next, done) {
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

/* Remove password and pepper from exported json && object
 * Based on: http://ksloan.net/tips-for-using-mongoose-schemas-with-express-mongo-express-node-stack/
 */
RecipientSchema.set('toJSON', {
  transform: function transformJSON(doc, objRepresentation) {
    return {
      recipientId: objRepresentation.recipientId,
      email: objRepresentation.email,
      displayName: objRepresentation.displayName,
      dateCreated: objRepresentation.dateCreated,
      dateUnsubscribed: objRepresentation.dateUnsubscribed,
      status: objRepresentation.status,
    };
  },
});

/* Find a recipient by an recipientId
 * @param {number} recipientId - the recipient id
 * @returns {promise} - a promise to find something
 */
RecipientSchema.statics.findOneRecipient = function findAccountById(recipientId) {
  return this.findOne({ recipientId: recipientId }).exec();
};

/* Find a recipient by an recipientId and update the appropriate fields.
 * @param {number} recipientId - the recipient id
 * @param {object} fieldsToUpdate - the fields and their values to update to.
 * @returns {promise} - a promise to find something
 * @note: We do it this way instead of findOneAndUpdate because update and valdiation hooks are
 *   not called on findOneAndUpdate.
 */
RecipientSchema.statics.update = function findAccountById(recipientId, ownerId, fieldsToUpdate) {
  return this.findOne({ recipientId: recipientId, ownerAccountId: ownerId }).exec()
    .then((foundItem) => {
      const foundRecipient = foundItem;
      const fieldsToUpdateKeys = Object.keys(fieldsToUpdate);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundRecipient[key] = fieldsToUpdate[key];
      });
      return foundRecipient.save();
    });
};

/* Find a recipient by an email address
 * @param {string} email - the associated email address
 * @returns {promise} - a promise to find something
 */
RecipientSchema.statics.findOneByEmail = function findAccountByEmail(email) {
  return this.findOne({ email: email }).exec();
};

/* Find all recipients for an accountId
 * @param {string} accountId - the accountId to search for
 * @returns {promise} - a promise to find something
 */
RecipientSchema.statics.findAllForId = function findRecipients(accountId, lean = true) {
  if (lean) {
    return this.find({ ownerAccountId: accountId }).lean().exec();
  }
  return this.find({ ownerAccountId: accountId }).exec();
};

/* Determine total number of recipients for account
 * @param {number} - accountId
 */
RecipientSchema.statics.totalForAccountId = function countPosts(accountId) {
  return this.count({ ownerAccountId: accountId }).exec();
};

/* Compile the schema into a model
 * http://mongoosejs.com/docs/models.html
 */
const Recipient = mongoose.model('Recipient', RecipientSchema);

export { Recipient, RecipientStatus };
