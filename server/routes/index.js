import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import authenticate from '../middlewares/authenticate';

export default (app) => {
  // Users API Endpoint
  app.post('/users', usersController.create);
  app.get('/users', usersController.list);
  app.get('/users/:id', usersController.retrieve);
  app.put('/users/:id', usersController.update);
  app.delete('/users/:id', usersController.destroy);

  // Authentication Endpoint
  app.post('/login', usersController.login);

  // Documents API Endpoints
  app.post('/documents', documentsController.create);
  app.get('/documents', usersController.list);
  app.get('/documents/:id', usersController.retrieve);
  app.put('/documents/:id', usersController.update);
  app.delete('/documents/:id', usersController.destroy);
};
