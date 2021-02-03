'use strict';
const faker = require('faker');

const randomName = faker.internet.username.findName();
const randomEmail = faker.internet.email(); 
const password = random.hex(32)

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    */
   return queryInterface.bulkInsert('Users', [{
     username: randomName,
     email: randomEmail,
     hashedPassword: password,
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: randomName,
    email: randomEmail,
    hashedPassword: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ], {});
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
