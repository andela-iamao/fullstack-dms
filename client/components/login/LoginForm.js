import React from 'react';
import { connect } from 'react-redux';
import validateInput from '../../../server/shared/validations/login';
import { login } from '../../actions/authActions';
import TextField from 'material-ui/TextField';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) this.setState({ errors });

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.login(this.state).then(
        () => {
          this.context.router.push('/');
        },
        
        ({ data }) => this.setState({ errors: data })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password } = this.state;

    return (
      <div className="row">
        <form onSubmit={this.onSubmit}>
          <h1>Login</h1>
          {errors.form && <div style={{color: "#F44336"}}>{errors.form}</div>}
          <TextField
              hintText="Username or Email"
              errorText={errors.identifier}
              onChange={this.onChange}
              value={this.state.identifier}
              name="identifier"
              fullWidth
            /><br />
          <TextField
              hintText="Password"
              errorText={errors.password}
              onChange={this.onChange}
              value={this.state.password}
              type="password"
              name="password"
              fullWidth
            /><br />
          <br />
          <br />
          <button className="btn waves-effect waves-light blue" name="action" type="submit">Login
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginForm);
