'use strict';
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define(
        'Note',
        {
            userId: DataTypes.INTEGER,
            songPostId: DataTypes.INTEGER,
            body: DataTypes.STRING,
        },
        {}
    );
    Note.associate = function (models) {
        Note.belongsTo(models.SongPost({ foreignKey: 'songPostId' }));
        Note.belongsTo(models.User({ foreignKey: 'userId' }));
    };
    return Note;
};
