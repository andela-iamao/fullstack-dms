/* eslint react/prefer-stateless-function: 0*/

import React from 'react';
import { connect } from 'react-redux';
import { createDocument } from '../../actions/documentActions';
import TextFieldGroup from '../common/TextFieldGroup';

class DocumentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onchange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createDocument(this.state);
  }

  render() {
    const { title, errors, isLanding } = this.state;

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
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

DocumentForm.propTypes = {
  createDocument: React.PropTypes.func.isRequired,
};

export default connect(null, { createDocument })(DocumentForm);
