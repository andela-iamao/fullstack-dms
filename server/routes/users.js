import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const { name, email, password, role } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);
    const roleId = parseInt(role);

    User.build({ name, email, password_digest, roleId })
      .save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
  } else {
    res.status(400).json(errors);
  }
});


export default router;