import authenticate from '../middlewares/authenticate';
import db from '../models';

export default {

  create(req, res) {
    res.status(201).json({ success: true });
  },

  list(req, res) {
  },

  retrieve(req, res) {
  },

  update(req, res) {
  },

  destroy(req, res) {

  }
};
