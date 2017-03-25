const expect = require('chai').expect;
const User = require('../../../server/models').User;

const params = {
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com'
};

let user = null;

describe('User model', () => {
  beforeEach(() => {
    user = User.build(params);
  });

  describe('.build', () => {
    it('creates a User instance', () =>
     expect(user).not.to.be.null);
    it('has both first and last names', () => {
      expect(user.firstName).to.equal(params.firstName);
      expect(user.lastName).to.equal(params.lastName);
    });
  });
});
