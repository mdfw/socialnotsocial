import { should, expect } from 'chai';
import { appraiseThese, appraiseEmail, appraiseDisplayName, appraisePassword, appraiseAccountId } from '../src/shared/helpers/appraise.js'
/*
describe('appraiseThese', function() {
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
*/
describe('appraiseDisplayName', function() {
  it('Passes valid options',  function() {
    const validationMessages = new appraiseDisplayName('bob');
    expect(validationMessages.length).to.equal(0);
  });
  it('Rejects empty options and returns an error',  function() {
    const validationMessages = new appraiseDisplayName('');
    expect(validationMessages.length).to.equal(1);
    expect(validationMessages[0]).to.equal('Display name is required.');
  });
});

describe('appraiseEmail', function() {
  it('Passes valid options',  function() {
    const validationMessages = appraiseEmail('b@c.com');
    expect(validationMessages.length).to.equal(0);
  });
  it('Rejects empty options and returns an error.',  function() {
    const validationMessages = appraiseEmail('');
    expect(validationMessages.length).to.equal(1);
    expect(validationMessages[0]).to.equal('Email address is required.');
  });
  it('Rejects invalid email addresses and returns an error.',  function() {
    const validationMessages = appraiseEmail('bob');
    expect(validationMessages.length).to.equal(1);
    expect(validationMessages[0]).to.equal('Email address does not appear to be valid.');
  });
});
  
describe('appraisePassword', function() {
  it('Passes valid options',  function() {
    const validationMessages = appraisePassword('83nUNLIh398*');
    expect(validationMessages.length).to.equal(0);
  });
  it('Rejects empty options and returns an error',  function() {
    const validationMessages = appraisePassword('');
    expect(validationMessages.length).to.equal(1);
  });
  it('Rejects a non-strong password',  function() {
    const validationMessages = appraisePassword('3');
    expect(validationMessages.length).to.equal(4);
  });
  it('Passes a passphrase (over 20 chars)',  function() {
    const validationMessages = appraisePassword('This is a strong passphrase that is over 20 chars');
    expect(validationMessages.length).to.equal(0);
  });


});
