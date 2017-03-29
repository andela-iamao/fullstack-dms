import { expect } from 'chai';
import db from '../../../server/models';
import helper from '../../test-helper';

const documentParams = helper.publicDocument;
const userParams = helper.firstUser;

const notNullAttrs = ['title', 'content', 'ownerId'];

let document;

describe('Document model', () => {
  before(() =>
    db.User.create(userParams)
      .then((user) => {
        documentParams.ownerId = user.id;
        document = db.Document.build(documentParams);
      })
  );

  // clear DB after each test
  after(() => db.Document.sequelize.sync({ force: true }));

  describe('Create document', () => {
    it('creates a Document instance', () =>
      expect(document).to.exist);

    it('has both title and content', () => {
      expect(document.title).to.equal(documentParams.title);
      expect(document.content).to.equal(documentParams.content);
    });

    it('saves document with valid attributes', () =>
      document.save().then((newDoc) => {
        expect(newDoc.title).to.equal(document.title);
        expect(newDoc.content).to.equal(document.content);
        expect(newDoc.access).to.equal(document.access);
        expect(newDoc.ownerId).to.equal(document.ownerId);
      }));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          document[attr] = null;

          document.save()
            .then(newDoc => expect(newDoc).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });
  });
});
