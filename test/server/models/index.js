import { expect } from 'chai';
import models from '../../../server/models';

describe('Models', () => {
  it('creates User model', () => expect(models.User).to.exist);
  it('creates Document model', () => expect(models.Document).to.exist);
});
