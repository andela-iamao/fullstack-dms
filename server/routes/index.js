import usersController from '../controllers/users';
import auth from '../controllers/auth'

export default (app) => {

  // Users API Endpoint
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:id', usersController.retrieve);
  app.put('/api/users/:id', usersController.update);
  app.delete('/api/users/:id', usersController.destroy);

  // Authentication Endpoint
  app.post('/api/auth', auth.login);
}
