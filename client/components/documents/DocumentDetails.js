import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-materialize';

export default
function DocumentDetails({ document, deleteDocument, currentUser }) {
  return (
    <div className="col s12">
      <div className="card qBox">
        <div className="card-content white-text">
          <span className="card-title">{document.title}</span>
          <p>{document.content}</p><br />
          <p>Access Type: &nbsp;
            <span>{(document.access).toUpperCase()}</span></p><br />
          <div>
              Published Date :
            <p>{(document.createdAt) ?
              document.createdAt.split('T')[0] : ''}</p>
            <p>Author:
              {document.owner.firstName} {document.owner.lastName}</p>
          </div>
        </div>
        <div className="card-action">
          <Link to="/">back to documents</Link>
          {currentUser.userId === document.ownerId && <div>
            <Button waves="light" className="btn-floating blue darken-4 right">
              <Link to={`/document/${document.id}`}>
                <i className="material-icons">mode_edit</i>
              </Link>
            </Button>
            <Button
              waves="light"
              onClick={() => deleteDocument(document.id)}
              className="btn-floating red darken-2 right"
            >
              <i className="material-icons">delete</i>
            </Button>
          </div>}
        </div>
      </div>
    </div>
  );
}

DocumentDetails.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
};
