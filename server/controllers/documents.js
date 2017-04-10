import db from '../models';

export default {

  /**
   * Create a document
   * Route: POST: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  create(req, res) {
    const { title, content, access } = req.body;
    const OwnerId = req.decoded.UserId;
    db.Document.create({ title, content, access, OwnerId })
      .then((document) => {
        res.status(201).send(document);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get all documents
   * Route: GET: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  list(req, res) {
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { OwnerId: req.decoded.UserId }
        ]
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    };

    db.Document.findAll(query).then((documents) => {
      res.send(documents);
    });
  },

  /**
   * Get a particular document
   * Route: GET: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  retrieve(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        if ((document.access === 'public') ||
          (document.OwnerId === req.decoded.UserId)) {
          return res.send(document);
        }

        db.User.findById(document.OwnerId)
          .then((owner) => {
            if (owner.RoleId === req.decoded.RoleId) {
              return res.send(document);
            }

            res.status(403)
              .send({ message: 'You cannot access this document.' });
          });
      });
  },

  /**
   * Update a particular document
   * Route: PUT: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        if (document.OwnerId === req.decoded.UserId) {
          document.update(req.body)
            .then((updatedDocument) => {
              res.send(updatedDocument);
            });
        } else {
          return res.status(403).send(
            { message: 'You don\'t have permission to update this document' });
        }
      });
  },

  /**
   * Delete a particular document
   * Route: DELETE: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    db.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }
        if (document.OwnerId === req.decoded.UserId) {
          document.destroy()
            .then(() => res.send({ message: 'Document deleted successfully.' }));
        } else {
          return res.status(403).send(
            { message: 'You don\'t have permission to delete this document' });
        }
      });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /users/:id/documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  userDocuments(req, res) {
    db.Document.findAll({ where: { OwnerId: req.params.id } })
      .then((documents) => {
        res.send(documents);
      });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /search?query={doctitle}
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  search(req, res) {
    const queryString = req.query.query;

    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { OwnerId: req.decoded.UserId }
        ] }],
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    };

    if (queryString) {
      query.where.$and.push({ $or: [
        { title: { $like: `%${queryString}%` } },
        { content: { $like: `%${queryString}%` } }
      ] });
    }

    db.Document.findAll(query)
      .then((documents) => {
        res.send(documents);
      });
  }
};
