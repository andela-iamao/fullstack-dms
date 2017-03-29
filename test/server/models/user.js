import { expect } from 'chai';
import { User } from '../../../server/models';

import helper from '../../test-helper';

const userParams = helper.firstUser;


const notNullAttrs = ['name', 'email', 'password'];
const uniqueAttrs = ['email'];

let user;

describe('User model', () => {
  beforeEach(() => {
    user = User.build(userParams);
    return User.sequelize.sync({ force: true });
  });

  describe('Create', () => {
    it('creates a User instance', () =>
      expect(user).not.to.be.null);

    it('has name attribute', () => {
      expect(user.name).to.equal(userParams.name);
    });

    it('saves user with valid attributes', () =>
      user.save().then(newUser =>
        expect(newUser.name).to.equal(user.name)));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          user[attr] = null;

          user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    describe('UNIQUE attributes', () => {
      uniqueAttrs.forEach((attr) => {
        it(`fails for non unique ${attr}`, () => {
          user.save();

          User.build(userParams).save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/SequelizeUniqueConstraintError/.test(err.name)).to.be.true);
        });
      });
    });
  });
});
