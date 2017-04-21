import rolesController from '../controllers/roles';
import auth from '../middlewares/auth';

export default (app) => {
  // Roles API Endpoints
  app.post('/roles', auth.verifyToken, auth.permitAdmin, rolesController.create);
  app.get('/roles', auth.verifyToken, auth.permitAdmin, rolesController.list);
  app.get('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.retrieve);
  app.put('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.update);
  app.delete('/roles/:id', auth.verifyToken, auth.permitAdmin, rolesController.destroy);
};
