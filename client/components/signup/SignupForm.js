import React from 'react';
import validateInput from '../../../server/shared/validations/signup';
import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';


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
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="UserName"
          errorText="This field is required"
        /><br />
        <TextField
          hintText="First Name"
          errorText="The error text can be as long as you want, it will wrap."
        /><br />
        <TextField
          hintText="Last Name"
          errorText="This field is required"
        /><br />
        <TextField
          hintText="Email"
          errorText="This field is required."
        /><br />
        <TextField
          hintText="Password"
          errorText="This field is required"
        /><br />
        <TextField
          hintText="Password Confirmation"
          errorText="This field is required."
        /><br />
        <br />
        <br />
        <RaisedButton label="Primary" primary={true} />
      </div>
    );
  }
}

export default SignupForm;
