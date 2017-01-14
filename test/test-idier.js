import { should, expect } from 'chai';
import '../src/config/environment.js';
import { idier, toHumanId, toNumericId, passGen } from '../src/shared/helpers/idier.js'

describe('idier', function() {
  it('Creates a unique id that is greater than 10 digits',  function() {
    const myId1 = idier();
    const myId2 = idier();
    expect(myId1).to.be.a('number');
    expect(myId1).to.not.equal(myId2);
    expect(`${myId1}`.length).to.be.above(10);
  });
  it('Converts an id to a human readable form that is greater than 5 digits',  function() {
    const myId1 = idier();
    const humanity = toHumanId(myId1);
    expect(humanity).to.be.a('string');
    expect(humanity.length).to.be.above(5);
  });
  it('  ...and converts it back to the same id',  function() {
    const myId1 = idier();
    const humanity = toHumanId(myId1);
    const decoded = toNumericId(humanity);
    expect(myId1).to.be.equal(decoded);
  });
  it('Creates a 12 digit password',  function() {
    const testPass = passGen();
    expect(testPass).to.be.a('string');
    expect(testPass.length).to.be.equal(12);
  });

});

