'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', [])
  }
};
