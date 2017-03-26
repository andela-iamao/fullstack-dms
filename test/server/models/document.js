const expect = require('chai').expect;
const Document = require('../../../server/models').Document;

const params = {
  title: 'Document 1',
  content: 'This is a new document'
};
let document;
describe('Document model', () => {
  beforeEach(() => {
    document = Document.build(params);
  });

  describe('.build', () => {
    it('creates a Document instance', () =>
     expect(document).to.exist);
    it('has both title and content', () => {
      expect(document.title).to.equal(params.title);
      expect(document.content).to.equal(params.content);
    });
  });
});
