const expect = require('chai').expect;
const models = require('../../../server/models');

describe('Models', () => {
  it('Has User model', () => expect(models.User).to.be.ok);
});
