import supertest from 'supertest';
import chai from 'chai';
import app from '../../index';
import { Role, User } from '../../models';
import helper from '../test-helper';

const request = supertest.agent(app);
const expect = chai.expect;

const params = helper.firstUser;
const roleParams = helper.adminRole;

let token;

describe('Authorisation middleware', () => {
  before(() =>
    Role.create(roleParams)
      .then((role) => {
        params.roleId = role.id;
        return User.create(params);
      })
      .then(() => {
        request.post('/users/login')
          .send(params)
          .end((err, res) => {
            token = res.body.token;
          });
      }));

  // clear DB after each test
  after(() => User.sequelize.sync({ force: true }));

  it('should return unauthorised without a token', (done) => {
    request.get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return unauthorised for invalid token', (done) => {
    request.get('/users')
      .set({ Authorization: 'invalid token' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
