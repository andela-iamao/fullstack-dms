import axios from 'axios';

export function createDocument(document) {
  return (dispatch) => {
    axios.post('/api/documents', document);
  };
}
