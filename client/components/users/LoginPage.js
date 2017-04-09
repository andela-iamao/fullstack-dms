import LoginForm from './LoginForm';
import React from 'react';

class LoginPage extends React.Component {
  
  submit(values) {
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <LoginForm onSubmit={this.submit} />
    );
  }
}