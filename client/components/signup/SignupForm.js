import React from 'react';
import validateInput from '../../../server/shared/validations/signup';
import TextField from 'material-ui/TextField';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
    // console.log(this.state);
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <TextField
            hintText="UserName"
            errorText="This field is required"
            onChange={this.onChange}
            value={this.state.username}
            name="username"
          /><br />
          <TextField
            hintText="First Name"
            errorText="The error text can be as long as you want, it will wrap."
            onChange={this.onChange}
            value={this.state.firstName}
            name="firstName"
          /><br />
          <TextField
            hintText="Last Name"
            errorText="This field is required"
            onChange={this.onChange}
            value={this.state.lastName}
            name="lastName"
          /><br />
          <TextField
            hintText="Email"
            errorText="This field is required."
            onChange={this.onChange}
            value={this.state.email}
            name="email"
          /><br />
          <TextField
            hintText="Password"
            errorText="This field is required"
            onChange={this.onChange}
            value={this.state.password}
            name="password"
          /><br />
          <TextField
            hintText="Password Confirmation"
            errorText="This field is required."
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            name="passwordConfirmation"
          /><br />
          <br />
          <br />
          <button className="btn waves-effect waves-light blue" name="action" type="submit">Sign up
          </button>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default SignupForm;
