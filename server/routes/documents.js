import documentsController from '../controllers/documents';
import auth from '../middlewares/auth';

export default (app) => {
  // Documents API Endpoints
  app.post('/documents', auth.verifyToken, documentsController.create);
  app.get('/documents', auth.verifyToken, documentsController.list);
  app.get('/documents/:id', auth.verifyToken, documentsController.retrieve);
  app.put('/documents/:id', auth.verifyToken, auth.permitOwner, documentsController.update);
  app.get('/search/documents', auth.verifyToken, documentsController.search);
  app.delete('/documents/:id', auth.verifyToken, documentsController.destroy);
};
