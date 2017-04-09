import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DocumentForm from './components/documents/DocumentForm';
import DocumentsPage from './components/documents/DocumentsPage';
import DocumentShowPage from './components/documents/DocumentShowPage';
import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="new-document" component={requireAuth(DocumentForm)} />
    <Route path="documents" component={DocumentsPage} />
    <Route path="showdocument" component={DocumentShowPage} />
  </Route>
);
