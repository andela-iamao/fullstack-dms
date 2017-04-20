import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import auth from '../middlewares/auth';

export default (app) => {
  // Users API Endpoint
  app.post('/users', usersController.create);
  app.get('/users', auth.verifyToken, auth.permitAdmin, usersController.list);
  app.get('/users/:id', auth.verifyToken, usersController.retrieve);
  app.put('/users/:id', auth.verifyToken, usersController.update);
  app.delete('/users/:id', auth.verifyToken, usersController.destroy);
  app.get('/users/:id/documents', auth.verifyToken, documentsController.userDocuments);
  app.get('/search/users', auth.verifyToken, usersController.search);

   // Authentication Endpoint
  app.post('/users/login', usersController.login);
  app.post('/users/logout', usersController.logout);
};
