/* eslint react/prefer-stateless-function: 0*/

import React from 'react';
import DocumentForm from './DocumentForm';

class NewDocumentForm extends React.Component {
  render() {
    return (
      <div>
        <DocumentForm />
      </div>
    );
  }
}

export default NewDocumentForm;
