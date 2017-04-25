import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import auth from '../middlewares/auth';

export default (app) => {
  app.post('/users', usersController.create);
  app.get('/users', auth.verifyToken, usersController.list);
  app.get('/users/:id', auth.verifyToken, usersController.retrieve);
  app.put('/users/:id', auth.verifyToken, usersController.update);
  app.delete('/users/:id', auth.verifyToken, usersController.destroy);
  app.get('/users/:id/documents', auth.verifyToken, documentsController.userDocuments);
  app.get('/search/users', auth.verifyToken, usersController.search);
  app.post('/users/login', usersController.login);
  app.post('/users/logout', usersController.logout);
};
