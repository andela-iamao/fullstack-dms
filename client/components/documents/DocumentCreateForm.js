import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { TextField, SelectField, MenuItem } from 'material-ui';
import validateInput from '../../../server/shared/validations/createdocument';
import { saveDocument } from '../../actions/documentActions'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class DocumentCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.saveDocument(this.state).then(
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

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) this.setState({ errors });

    return isValid;
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.refs.dropdown)

    $(element).ready(function() {
      $('select').material_select();
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <form onSubmit={this.onSubmit}>
          <h1>Create Document</h1>
          <TextField
              floatingLabelText="Document Title"
              errorText={errors.title}
              onChange={this.onChange}
              value={this.state.title}
              name="title"
              fullWidth
            /><br />
          <TextField
              floatingLabelText="Document Content"
              errorText={errors.content}
              onChange={this.onChange}
              value={this.state.content}
              name="content"
              multiLine
              fullWidth
            /><br />
          <div>
            <select
              className="input-field"
              name="access" 
              onChange={this.onChange}
              value={this.state.access}
              ref="dropdown"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
          </div>
          <br />
          <br />
          <button className="btn waves-effect waves-light blue" name="action" type="submit">Save Document
          </button>
        </form>
      </div>
    );
  }
}

DocumentCreateForm.propTypes = {
  saveDocument: React.PropTypes.func.isRequired,
};

export default connect(null, { saveDocument })(DocumentCreateForm);
