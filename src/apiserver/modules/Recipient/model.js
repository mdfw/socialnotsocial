import mongoose, { Schema } from 'mongoose';
import { isEmail } from 'validator';
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
const recipientSchema = new Schema({
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
    validate: [isEmail, 'You must provide a valid email.'],
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

/* Create an compound index on ownerAccountId + email. This search happens on recipient creation. */
recipientSchema.index({
  ownerAccountId: 1,
  email: 1,
});

/* If it's a new recipient, create an recipientId and loginToken for it. */
recipientSchema.pre('validate', function preValidateRecipient(next) {
  console.log('Called pre save recipient');
  if (!this.recipientId) {
    this.recipientId = idier();
  }
  if (!this.loginToken) {
    this.loginToken = passGen();
  }
  next();
});

/* Compile the schema into a model
 * http://mongoosejs.com/docs/models.html
 */
const Recipient = mongoose.model('Recipient', recipientSchema);

export { Recipient, RecipientStatus };
