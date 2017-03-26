const expect = require('chai').expect;
const models = require('../../../server/models');

describe('Models', () => {
  it('Defines User model', () => expect(models.User).to.exist);
  it('Defines Role model', () => expect(models.Role).to.exist);
});
