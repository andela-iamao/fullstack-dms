if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  adminRole: {
    title: 'admin'
  },

  regularRole: {
    title: 'regular'
  },

  role: {
    title: 'author'
  },

  firstUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordDigest: bcrypt.hashSync('awa321', bcrypt.genSaltSync(8)),
    RoleId: 1
  },

  secondUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordDigest: bcrypt.hashSync('awa321', bcrypt.genSaltSync(8)),
    RoleId: 2
  },

  thirdUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordDigest: bcrypt.hashSync('awa321', bcrypt.genSaltSync(8)),
    RoleId: 2
  },

  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },

  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },

  roleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role'
  },

  documentArray() {
    const documentAttributes = [];

    for (let i = 0; i <= 10; i += 1) {
      documentAttributes.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        OwnerId: 1
      });
    }

    return documentAttributes;
  }
};
