import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewDocumentPage from './components/documents/NewDocumentPage';
import requireAuth from './utils/requireAuth';
import DocumentsPage from './components/documents/DocumentsPage';
import DocumentDetailsPage from './components/documents/DocumentDetailsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="new-document" component={requireAuth(NewDocumentPage)} />
    <Route path="documents" component={DocumentsPage} />
    <Route path="showdocument" component={DocumentDetailsPage} />
  </Route>
);
