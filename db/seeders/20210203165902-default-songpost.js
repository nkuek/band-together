'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SongPosts', [

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SongPosts', [])
  }
};
