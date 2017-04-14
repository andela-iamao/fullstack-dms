import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ManageDocumentPage from './components/documents/ManageDocumentPage';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="document" component={ManageDocumentPage} />
    <Route path="document/:id" component={ManageDocumentPage} />
  </Route>
);
