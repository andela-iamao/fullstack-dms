import React from 'react';
import DocumentsList from './DocumentList';
import { connect } from 'react-redux';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';

class DocumentsPage extends React.Component {
  componentDidMount() {
    this.props.fetchDocuments();
  }

  render() {
    return (
      <div>
        <h1>Documents List</h1>

        <DocumentsList documents={this.props.documents} deleteDocument={this.props.deleteDocument} />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    documents: state.documents,
  }
}

export default connect(mapStateToProps, { fetchDocuments, deleteDocument })(DocumentsPage);
