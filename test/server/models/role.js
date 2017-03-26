const expect = require('chai').expect;
const Role = require('../../../server/models').Role;

const params = { title: 'admin' };
let role;
describe('Role model', () => {
  beforeEach(() => {
    role = Role.build(params);
    return Role.sequelize.sync({ force: true });
  });

  describe('Create Role', () => {
    it('creates a Role instance', () =>
     expect(role).to.exist);

    it('has title attribute', () =>
      expect(role.title).to.equal(params.title)
    );
    it('saves role with valid attributes', () =>
      role.save().then(newRole =>
        expect(newRole.title).to.equal(role.title))
    );
  });

  describe('Validations', () => {
    it('fails without a title', () => {
      Role.build({}).save()
        .then(newRole => expect(newRole).to.not.exit)
        .catch(err =>
          expect(/notNull/.test(err.message)).to.be.true);
    });

    it('fails for non unique title', () => {
      role.save();

      Role.build(params).save()
        .then(newUser => expect(newUser).to.not.exist)
        .catch(err =>
          expect(/SequelizeUniqueConstraintError/.test(err.name)).to.be.true);
    });
  });
});
