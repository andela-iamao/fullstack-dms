import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import commonValidations from '../shared/validations/signup';
import db from '../models';

const validateInput = (data, otherValidations) => {
  const { errors } = otherValidations(data);
  return db.User
    .findOne({
      where: { $or: [
        { email: data.email }, { username: data.username }
      ] },
    })
    .then((user) => {
      if (user) {
        if (user.username === data.username) {
          errors.username = 'There is user with such username';
        }
        if (user.email === data.email) {
          errors.email = 'There is user with such email';
        }
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
};

export default {

  create(req, res) {
    validateInput(req.body, commonValidations)
    .then(({ errors, isValid }) => {
      if (isValid) {
        const { username, email, password } = req.body;
        const passwordDigest = bcrypt.hashSync(password, 10);

        db.User.create({ username, email, passwordDigest })
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));
      } else {
        res.status(400).json(errors);
      }
    });
  },

  list(req, res) {
    db.User.findAll({
      attributes: ['id', 'username', 'email'],
    }).then(users => res.json({ users }))
    .catch(err => res.status(400).json({ error: err }));
  },

  retrieve(req, res) {
    db.User.findOne({
      attributes: ['id', 'username', 'email'],
      where: { id: req.params.id }
    }).then((user) => {
      res.json({ user });
    });
  },

  update(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(400).json({ message: 'User Not Found!' });
        }

        const { errors, isValid } = commonValidations(req.body);
        if (isValid) {
          const { username, email, password } = req.body;
          const passwordDigest = bcrypt.hashSync(password, 10);

          user.update({ username, email, passwordDigest })
            .then(updatedUser => res.json({ success: true }))
            .catch(err => res.status(500).json({ error: err }));
        } else {
          res.status(400).json(errors);
        }
      }).catch(err => res.status(500).json({ error: err }));
  },

  destroy(req, res) {
    db.User.findById(req.params.id).then((user) => {
      if (!user) {
        res.status(400).json({ message: 'User Not Found' });
      }
      user.destroy().then(
        () => res.status(204).json())
        .catch(err => res.status(500).json({ error: err }));
    });
  }
};
