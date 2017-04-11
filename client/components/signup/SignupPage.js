import React from 'react';
import SignupForm from './SignupForm';

class SignupPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col m4 offset-m4">
          <SignupForm />
        </div>
      </div>
      );
  }
}
export default SignupPage;
