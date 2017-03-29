import faker from 'faker';

if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}

export default {
  firstUser: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    access: 'admin'
  },

  secondUser: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  thirdUser: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    ownerId: 1
  },

  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    ownerId: 2
  },

  adminDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'admin'
  },

  documentArray() {
    const documentAttributes = [];

    for (let i = 0; i <= 10; i += 1) {
      documentAttributes.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        ownerId: 1
      });
    }

    return documentAttributes;
  }
};
