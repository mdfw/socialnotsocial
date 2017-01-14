import { isEmail } from 'validator';

class SignupValidator {
  constructor(email, password, displayName) {
    console.log(`validator: email: ${email} password: ${password} displayName: ${displayName}`);
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
  allFields() {
    const validator = {
      success: true,
      errors: {
        'email': [],
        'password': [],
        'displayName': [],  
      }
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
    const messages = [];
    if (!this.displayName) {
      messages.push('Display name is required.');
    }
    if (messages.length > 0) {
      return messages;
    }
    return null;
  }
  emailValid() {
    const messages = [];
    if (!this.email) {
      messages.push('Email address is required.')
    }
    if (this.email && !isEmail(this.email)) {
      messages.push('Email address does not appear to be valid.')
    }
    if (messages.length > 0) {
      return messages;
    }
    return null;
  }
  passwordValid() {
    const messages = [];
    if (!this.password) {
      messages.push('Password is required.');
    }
    if (messages.length > 0) {
      return messages;
    }
    return null;
  }
}

export default SignupValidator;;