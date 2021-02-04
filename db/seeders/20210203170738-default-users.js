'use strict';
const faker = require('faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
    */
     const users = await queryInterface.bulkInsert('Users', [{
     username: faker.internet.userName(),
     email: faker.internet.email(),
     hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ], { returning: true });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
