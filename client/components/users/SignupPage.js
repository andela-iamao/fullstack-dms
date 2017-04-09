import SignupForm from './SignupForm';
import React from 'react';

class SignupPage extends React.Component {
  
  submit(values) {
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <SignupForm onSubmit={this.submit} />
    );
  }
}

