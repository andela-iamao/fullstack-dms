import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { TextField, SelectField, MenuItem } from 'material-ui';
import validateInput from '../../../server/shared/validations/createdocument';
import DocumentForm from './DocumentForm';
import toastr from 'toastr';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';



class ManageDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false,
    };

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.document.id != nextProps.document.id) {
      // Necessary to populate form when existing document is loaded directly.
      this.setState({document: Object.assign({}, nextProps.document)});
    }
  }
  updateDocumentState(event) {
    const field = event.target.name;
    let document = this.state.document;
    document[field] = event.target.value;
    return this.setState({document: document});
  }

  documentFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.document.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    if (this.state.document.content.access < 5) {
      errors.title = 'Document Content must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }


  saveDocument(event) {
    event.preventDefault();
    if (!this.documentFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveDocument(this.state.document)
      .then(() => {
        this.redirect()
      })
      .catch(error => {
        toastr.error(error);
        console.log(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Document saved');
    this.context.router.push('/');
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <DocumentForm
          onChange={this.updateDocumentState}
          onSave={this.saveDocument}
          document={this.state.document}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageDocumentPage.propTypes = {
  document: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
};

//Pull in the React Router context so router is available on this.context.router.
ManageDocumentPage.contextTypes = {
  router: React.PropTypes.object,
};

function getDocumentById(documents, id) {
  const document = documents.filter(document => document.id == id);
  if (document) return document[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const documentId = ownProps.params.id; // from the path `/document/:id`

  let document = {title: '', content: '', access: ''};

  if (documentId && state.documents.length > 0) {
    document = getDocumentById(state.documents, documentId);
  }

  return {
    document: document,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
