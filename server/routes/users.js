import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import db from '../models';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

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
router.post('/', (req, res) => {
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
});


export default router;