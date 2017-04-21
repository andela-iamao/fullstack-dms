import auth from '../middlewares/auth';
import users from './users';
import roles from './roles';
import documents from './documents';

export default (app) => {
  roles(app);
  users(app);
  documents(app);
};
