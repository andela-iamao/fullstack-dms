/* eslint react/prefer-stateless-function: 0*/

import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
