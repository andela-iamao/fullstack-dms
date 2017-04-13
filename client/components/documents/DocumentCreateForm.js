import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { TextField, SelectField, MenuItem } from 'material-ui';
import validateInput from '../../../server/shared/validations/createdocument';
import { saveDocument } from '../../actions/documentActions';

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

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) this.setState({ errors });

    return isValid;
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

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <h2>Create a Document </h2>
        <form onSubmit={this.onSubmit}>
          <div className="row">

            <div className="input-field">
              <input
               name="title" 
               type="text" 
               className="validate"
               onChange={this.onChange}
               value={this.state.title}
               ></input>
              <label htmlFor="title">Document Title</label>
            </div>

            <div className="input-field">
              <textarea 
                name="content" 
                className="materialize-textarea validate"
                onChange={this.onChange}
                value={this.state.content}
                ></textarea>
              <label htmlFor="content">Document Content</label>
            </div>

            <div className="input-field">
              <p>Select Access </p>
              <p>
                <input 
                  name="access" 
                  type="radio"
                  onChange={this.onChange}
                  value="public"
                  id="access1"
                />
                <label htmlFor="access1">Public</label>
              </p>
              <p>
                <input 
                  name="access" 
                  type="radio"
                  onChange={this.onChange}
                  value="private"
                  id="access2"
                />
                <label htmlFor="access2">Private</label>
              </p>
              <p>
                <input 
                  name="access" 
                  type="radio" 
                  onChange={this.onChange}
                  value="role"
                  id="access3"
                />
                <label htmlFor="access3">Role</label>
              </p>
            </div>
          </div><br />
          <button className="btn waves-effect waves-light blue" type="submit">Save Document
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
