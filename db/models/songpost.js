'use strict';
module.exports = (sequelize, DataTypes) => {
    const SongPost = sequelize.define(
        'SongPost',
        {
            postTitle: DataTypes.STRING,
            songTitle: DataTypes.STRING,
            artist: DataTypes.STRING,
            album: DataTypes.STRING,
            genre: DataTypes.STRING,
            songLink: DataTypes.STRING,
            body: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
        },
        {}
    );
    SongPost.associate = function (models) {
        SongPost.belongsTo(models.User({ foreignKey: 'userId' }));
        SongPost.hasMany(models.Notes({ foreignKey: 'songPostId' }));
    };
    return SongPost;
};
