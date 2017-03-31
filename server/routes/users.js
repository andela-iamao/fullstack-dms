import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import db from '../models';

let router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const { username, email, password } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);
    
    db.User.create({username,email,password_digest})
    .then(user => { 
      res.json({success:true})})
    .catch(err => 
      res.status(500).json({error:err})
    );
  } else {
    res.status(400).json(errors);
  }
});


export default router;