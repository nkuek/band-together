'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('SongPosts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            postTitle: {
                allowNull: false,
                type: Sequelize.STRING(200),
            },
            songTitle: {
                allowNull: false,
                type: Sequelize.STRING(100),
            },
            artist: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            album: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            genre: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            songLink: {
                type: Sequelize.STRING,
            },
            body: {
                type: Sequelize.TEXT,
            },
            userId: {
                allowNull: false,
                references: { model: 'Users' },
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('SongPosts');
    },
};
