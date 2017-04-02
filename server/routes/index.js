import usersController from '../controllers/users';
import login from '../controllers/login';
import documentsController from '../controllers/documents';
import authenticate from '../middlewares/authenticate';

export default (app) => {
  // Users API Endpoint
  app.post('/api/users', usersController.create);
  app.get('/api/users', authenticate, usersController.list);
  app.get('/api/users/:id', usersController.retrieve);
  app.put('/api/users/:id', usersController.update);
  app.delete('/api/users/:id', usersController.destroy);

  // Authentication Endpoint
  app.post('/api/auth', login);

  // Documents API Endpoints
  app.post('/api/documents', authenticate, documentsController.create);
  app.get('/api/documents', usersController.list);
  app.get('/api/documents/:id', usersController.retrieve);
  app.put('/api/documents/:id', usersController.update);
  app.delete('/api/documents/:id', usersController.destroy);
};
