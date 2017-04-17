import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import rolesController from '../controllers/roles';
import auth from '../middlewares/auth';

export default (app) => {
  // Roles API Endpoints
  app.post('/roles', auth.verifyToken, rolesController.create);
  app.get('/roles', auth.verifyToken, auth.permitAdmin, rolesController.list);
  app.get('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.retrieve);
  app.put('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.update);
  app.delete('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.destroy);

  // Users API Endpoint
  app.post('/users', usersController.create);
  app.get('/users', auth.verifyToken, auth.permitAdmin, usersController.list);
  app.get('/users/:id', auth.verifyToken, usersController.retrieve);
  app.put('/users/:id', auth.verifyToken, usersController.update);
  app.delete('/users/:id', auth.verifyToken, usersController.destroy);
  app.get('/users/:id/documents', auth.verifyToken, documentsController.userDocuments);

  // Authentication Endpoint
  app.post('/users/login', usersController.login);

  // Documents API Endpoints
  app.post('/documents', auth.verifyToken, documentsController.create);
  app.get('/documents', auth.verifyToken, documentsController.list);
  app.get('/documents/:id', auth.verifyToken, documentsController.retrieve);
  app.put('/documents/:id', auth.verifyToken, documentsController.update);
  app.get('/search/documents', auth.verifyToken, documentsController.search);
  app.delete('/documents/:id', auth.verifyToken, documentsController.destroy);
};
