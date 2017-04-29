import auth from '../app/middlewares/auth';
import documentsController from '../app/controllers/documents';
import usersController from '../app/controllers/users';
import rolesController from '../app/controllers/roles';

export default (app) => {
  // Roles API Endpoints
  app.post('/roles', auth.verifyToken, auth.permitAdmin, rolesController.create);
  app.get('/roles', auth.verifyToken, auth.permitAdmin, rolesController.list);
  app.get('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.retrieve);
  app.put('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.update);
  app.delete('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.destroy);

  // Users API Endpoints
  app.post('/users', usersController.create);
  app.get('/users', auth.verifyToken, usersController.list);
  app.get('/users/:id', auth.verifyToken, usersController.retrieve);
  app.put('/users/:id', auth.verifyToken, usersController.update);
  app.delete('/users/:id', auth.verifyToken, auth.permitAdmin, usersController.destroy);
  app.get('/users/:id/documents', auth.verifyToken, documentsController.userDocuments);
  app.get('/search/users', auth.verifyToken, usersController.search);
  app.post('/users/login', usersController.login);
  app.post('/users/logout', usersController.logout);

  // Documents API Endpoints
  app.post('/documents', auth.verifyToken, documentsController.create);
  app.get('/documents', auth.verifyToken, documentsController.list);
  app.get('/documents/:id', auth.verifyToken, documentsController.retrieve);
  app.put('/documents/:id', auth.verifyToken, auth.permitOwner, documentsController.update);
  app.get('/search/documents', auth.verifyToken, documentsController.search);
  app.delete('/documents/:id', auth.verifyToken, documentsController.destroy);
};
