import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models';
import config from '../config';

const permittedAttributes = (user) => {
  const attributes = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return attributes;
};

export default {

  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    const roleId = req.body.roleId && req.body.roleId < 3 ? req.body.roleId : 2;
    User.findOne(
      { where: {
        $or: [{ username }, { email }]
      } })
      .then((existingUser) => {
        const errors = {};
        if (existingUser) {
          if (existingUser.username === username) {
            errors.username = 'There is user with such username';
          }
          if (existingUser.email === email) {
            errors.email = 'There is user with such email';
          }
          res.status(409).send(errors);
        } else {
          User.create({
            username,
            firstName,
            lastName,
            email,
            password,
            roleId
          }).then((user) => {
            const token = jwt.sign({
              UserId: user.id,
              roleId: user.roleId
            }, config.jwtSecret, { expiresIn: 86400 });
            user = permittedAttributes(user);
            res.status(201).send({ token, expiresIn: 86400, user });
          })
          .catch((err) => {
            res.status(400).send({ error: err });
          });
        }
      });
  },

  /**
   * Get all users
   * Route: GET: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  list(req, res) {
    User.findAll({
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt'
      ],
      include: [{
        model: Role,
        as: 'Role',
      }],
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    }).then((users) => {
      res.send(users);
    });
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  retrieve(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user = permittedAttributes(user);
        res.send(user);
      });
  },

  /**
   * Update a particular user
   * Route: PUT: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user.update(req.body)
          .then((updatedUser) => {
            updatedUser = permittedAttributes(updatedUser);
            res.send(updatedUser);
          });
      });
  },

  /**
   * Delete a particular user
   * Route: DELETE: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: `User with id: ${req.params.id} not found` });
        }
        user.destroy()
          .then(() => res.send({ message: 'User deleted successfully.' }));
      });
  },

  /**
   * Login user
   * Route: POST: /users/login
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  login(req, res) {
    const { identifier, password } = req.body;

    User.findOne({
      where: {
        $or: [{ username: identifier }, { email: identifier }]
      }
    })
    .then((user) => {
      const errors = {};
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({
            UserId: user.id,
            roleId: user.roleId
          }, config.jwtSecret, { expiresIn: 86400 });

          res.send({ token, expiresIn: 86400 });
        } else {
          errors.form = 'Invalid Credentials';
          res.status(401)
            .send(errors);
        }
      } else {
        errors.form = 'Invalid Credentials';
        res.status(401)
            .send(errors);
      }
    });
  },

  /**
   * Logout user
   * Route: POST: /users/logout
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  logout(req, res) {
    res.send({ message: 'Logout successful.' });
  },

  /**
   * Search for a user
   * Route: GET: /search/users?q={queryParam}
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  search(req, res) {
    User.findAll({
      where: {
        $or: [{
          username: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          firstName: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          lastName: {
            $iLike: `%${req.query.q}%`
          }
        },
        {
          email: {
            $iLike: `%${req.query.q}%`
          }
        }]
      }
    }).then((users) => {
      if (!users) {
        return res.status(404)
            .send({ message: 'No user found' });
      }
      const results = users.map(user => permittedAttributes(user));
      res.status(200).send(results);
    })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
};
