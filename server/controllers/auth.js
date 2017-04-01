import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';


export default {
  login(req, res) {
    const { identifier, password } = req.body;

    db.User.findOne({
      where: {
        $or: [{ username: identifier }, { email: identifier }]
      }
    }).then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.passwordDigest)) {
          const token = jwt.sign({
            id: user.id,
            username: user.username
          }, config.jwtSecret);
          res.json({ token });
        } else {
          res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    });
  },
};
