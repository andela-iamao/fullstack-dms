const expect = require('chai').expect;
const Role = require('../../../server/models').Role;

const params = { title: 'admin' };
let role;
describe('Role model', () => {
  beforeEach(() => {
    role = Role.build(params);
  });

  describe('.build', () => {
    it('creates a Role instance', () =>
     expect(role).to.exist);
    it('has title attribute', () => {
      expect(role.title).to.equal(params.title);
    });
  });
});
