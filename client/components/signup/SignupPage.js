import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest })(SignupPage);
