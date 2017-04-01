import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import db from '../models';
import isEmpty from 'lodash/isEmpty';

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);
  return db.User.findOne({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).then(user => {
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
}

export default {

  create(req, res) {
    validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, email, password } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      
      db.User.create({username,email,password_digest})
      .then(user => res.json({ success:true }))
      .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });
  },

  list(req, res) {

  },

  retrieve(req, res) {
    db.User.findOne({
      attributes: [ 'username', 'email' ],
      where: { $or: [ { email: req.params.identifier }, { username: req.params.identifier } ] }
    }).then(user => {
      res.json({ user })
    });
  },

  update(req, res) {
    
  },

  destroy(req, res) {

  }
}