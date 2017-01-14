import { should, expect } from 'chai';
import SignupValidator from '../src/shared/helpers/signupValidators.js'

describe('signupValidator.allFields', function() {
  it('Passes valid options',  function() {
    const validator = new SignupValidator('b@c.com', 'AAA', 'bob');
    const valid = validator.allFields();
    expect(valid.success);
    expect(valid.errors.email.length).to.equal(0);
    expect(valid.errors.email.length).to.equal(0);
    expect(valid.errors.displayName.length).to.equal(0);
  });
  it('Rejects empty options and returns errors for all.',  function() {
    const validator = new SignupValidator('', '', '');
    const valid = validator.allFields();
    expect(!valid.success);
    expect(valid.errors.email.length).to.equal(1);
    expect(valid.errors.password.length).to.equal(1);
    expect(valid.errors.displayName.length).to.equal(1);
  });
  it('Rejects invalid email addresses and returns an error.',  function() {
    const validator = new SignupValidator('bob', '', '');
    const valid = validator.allFields();
    expect(!valid.success);
    expect(valid.errors.email[0]).to.equal('Email address does not appear to be valid.');
    expect(valid.errors.password.length).to.equal(1);
    expect(valid.errors.email.length).to.equal(1);
    expect(valid.errors.displayName.length).to.equal(1);
  });
});

describe('signupValidator.displayNameValid', function() {
  it('Passes valid options',  function() {
    const validator = new SignupValidator('b@c.com', 'AAA', 'bob');
    const validationMessages = validator.displayNameValid();
    expect(validationMessages.length).to.equal(0);
  });
  it('Rejects empty options and returns an error',  function() {
    const validator = new SignupValidator('', '', '');
    const validationMessages = validator.displayNameValid();
    expect(validationMessages.length).to.equal(1);
  });
});

describe('signupValidator.emailValid', function() {
  it('Passes valid options',  function() {
    const validator = new SignupValidator('b@c.com', 'AAA', 'bob');
    const validationMessages = validator.emailValid();
    expect(validationMessages.length).to.equal(0);
  });
  it('Rejects empty options and returns an error.',  function() {
    const validator = new SignupValidator('', '', '');
    const validationMessages = validator.emailValid();
    expect(validationMessages.length).to.equal(1);
  });
  it('Rejects invalid email addresses and returns an error.',  function() {
    const validator = new SignupValidator('bob', '', '');
    const validationMessages = validator.emailValid();
    expect(validationMessages[0]).to.equal('Email address does not appear to be valid.');
  });
});
  
describe('signupValidator.passwordValid', function() {
  it('Passes valid options',  function() {
    const validator = new SignupValidator('b@c.com', 'AAA', 'bob');
    const validationMessages = validator.displayNameValid();
    expect(validationMessages.length).to.equal(0);
  });
  it('Rejects empty options and returns an error',  function() {
    const validator = new SignupValidator('', '', '');
    const validationMessages = validator.displayNameValid();
    expect(validationMessages.length).to.equal(1);
  });


});
