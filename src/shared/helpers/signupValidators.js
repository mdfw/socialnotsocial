import { isEmail } from 'validator';

/* Validates various fields that are required on new accounts.
 * Provides flexible tests depending on needs.
 */
class SignupValidator {
  constructor(email, password, displayName) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
  allFields() {
    /* All fields will test all fields as though they were required. Runs tests and returns
     * the validator object with the errors attached to the errors object.
     */
    const validator = {
      success: true,
      errors: {
        email: [],
        password: [],
        displayName: [],
      },
    };
    const mailMessages = this.emailValid();
    if (mailMessages && mailMessages.length > 0) {
      validator.success = false;
      validator.errors.email = mailMessages;
    }
    const displayMessages = this.displayNameValid();
    if (displayMessages && displayMessages.length > 0) {
      validator.success = false;
      validator.errors.displayName = displayMessages;
    }
    const passwordMessages = this.passwordValid();
    if (passwordMessages && passwordMessages.length > 0) {
      validator.success = false;
      validator.errors.password = passwordMessages;
    }

    return validator;
  }
  displayNameValid() {
    /* displayNameValid tests for the validity of the displayName.
     *  Only checks if it's empty.
     */
    const messages = [];
    if (!this.displayName.trim()) {
      messages.push('Display name is required.');
    }
    return messages;
  }
  emailValid() {
    /* Is the email valid? Uses the validator library to test.
     */
    const messages = [];
    if (!this.email.trim()) {
      messages.push('Email address is required.');
    }
    if (this.email && !isEmail(this.email)) {
      messages.push('Email address does not appear to be valid.');
    }
    return messages;
  }
  passwordValid() {
    /* Currently only checks on empty.
     *  TODO: add other checks for a valid password.
     */
    const messages = [];
    if (!this.password.trim()) {
      messages.push('Password is required.');
    }
    return messages;
  }
}

export default SignupValidator;
