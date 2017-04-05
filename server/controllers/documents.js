import authenticate from '../middlewares/authenticate';
import db from '../models';

export default {

  create(req, res) {
    db.Document.create({
      title: req.body.title,
      content: req.body.content
    }).then(document => res.status(200).json({ document }))
    .catch(error => res.status(400).json({ error }));
  },

  list(req, res) {
    db.Document.findAll()
      .then(documents => res.status(200).json({ documents }))
      .catch(error => res.status(400).json({ error }));
  },

  retrieve(req, res) {
    db.Document.findById(req.params.documentId)
      .then(document => {
        if (!document) {
          res.status(400).json({
            message: 'Document Not Found'
          });
        }
        res.status(200).json(document);
      })
      .catch(error => res.status(400).json({ error }));
  },

  update(req, res) {
    db.Document.findById(req.params.documentId)
      .then(document => {
        if (!document) {
          res.status(404).send({
            message: 'Document Not Found',
          });
        }
        Document.update({
          title: req.body.title || document.title,
          content: req.body.content || document.content
        })
        .then(() => res.status(200).json(Document))
        .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json(error));
  },

  destroy(req, res) {
    db.Document
      .findById(req.params.documentId)
        .then(document => {
          if (!document) {
            res.status(400).send({
              message: 'Document Not Found',
            });
          }
          Document
          .destroy()
          .then(() => res.status(204).send({ message: 'Document deleted successfully.' }))
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }
};
