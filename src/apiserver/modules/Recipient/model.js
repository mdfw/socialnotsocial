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
    type: Schema.Types.Number,
    default: RecipientStatusEnum.ACTIVE,
  },
  recipientId: {
    type: Schema.Types.Number,
    unique: true,
    required: true,
  },
  ownerAccountId: {
    type: Schema.Types.Number,
    required: true,
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
  }
});

/* If it's a new recipient, create an recipientId and loginToken for it. */
recipientSchema.pre('save', function presave(next) {
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

export default Recipient;
