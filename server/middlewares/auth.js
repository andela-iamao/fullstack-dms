import jwt from 'jsonwebtoken';
import config from '../config';
import { Role, User, Document } from '../models';

export default {
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = decoded;
      next();
    });
  },

  permitOwner(req, res, next) {
    Document.findById(req.params.id)
      .then((document) => {
        if (document.ownerId === req.decoded.userId) {
          next();
        } else {
          return res.status(401).send({
            message: 'You don\t have the rights to perform this operation'
          });
        }
      }).catch(err => {
        return res.status(404).send({
          message: `Document with ${req.params.id} not found`
        });
      });
  },
  permitAdmin(req, res, next) {
    Role.findById(req.decoded.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          return res.status(403).send({ message: 'You are not an admin' });
        }
      });
  }
};

