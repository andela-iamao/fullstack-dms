/* eslint react/prefer-stateless-function: 0*/

import React from 'react';
import { connect } from 'react-redux';
import { createDocument } from '../../actions/documentActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import validateInput from '../../../server/shared/validations/createdocument';

class DocumentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.createDocument(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Document Successfully Created!'
          });
          this.context.router.push('/');
        },
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { title, content, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Document</h1>

        <TextFieldGroup
          field="title"
          label="Document Title"
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />
        <TextAreaGroup
          field="content"
          label="Document Content"
          name="content"
          value={content}
          onChange={this.onChange}
          error={errors.content}
        />
        <button
          disabled={this.state.isLoading || this.state.invalid}
          type="submit" className="btn btn-primary"
        >Create
        </button>
      </form>
    );
  }
}

DocumentForm.propTypes = {
  createDocument: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
};

export default connect(null, { createDocument })(DocumentForm);
