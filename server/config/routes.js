import auth from '../app/middlewares/auth';
import Documents from '../app/controllers/Documents';
import Users from '../app/controllers/Users';
import Roles from '../app/controllers/Roles';

export default (app) => {
  // Roles API Endpoints
  app.post('/roles', auth.verifyToken, auth.permitAdmin, Roles.create);
  app.get('/roles', auth.verifyToken, auth.permitAdmin, Roles.list);
  app.get('/roles/:id', auth.verifyToken, auth.permitAdmin, Roles.retrieve);
  app.put('/roles/:id', auth.verifyToken, auth.permitAdmin, Roles.update);
  app.delete('/roles/:id', auth.verifyToken, auth.permitAdmin, Roles.destroy);

  // Users API Endpoints
  app.post('/users', Users.create);
  app.get('/users', auth.verifyToken, Users.list);
  app.get('/users/:id', auth.verifyToken, Users.retrieve);
  app.put('/users/:id', auth.verifyToken, Users.update);
  app.delete('/users/:id', auth.verifyToken, auth.permitAdmin, Users.destroy);
  app.get('/users/:id/documents', auth.verifyToken, Documents.userDocuments);
  app.get('/search/users', auth.verifyToken, Users.search);
  app.post('/users/login', Users.login);
  app.post('/users/logout', Users.logout);

  // Documents API Endpoints
  app.post('/documents', auth.verifyToken, Documents.create);
  app.get('/documents', auth.verifyToken, Documents.list);
  app.get('/documents/:id', auth.verifyToken, Documents.retrieve);
  app.put('/documents/:id', auth.verifyToken, auth.permitOwner, Documents.update);
  app.get('/search/documents', auth.verifyToken, Documents.search);
  app.delete('/documents/:id', auth.verifyToken, Documents.destroy);
};
