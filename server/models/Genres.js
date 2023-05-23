module.exports = (sequelize, DataTypes) => {
    const Genres = sequelize.define("Genres", {
        genre: {
            type: DataTypes.STRING,
 
        }
    });

    Genres.associate = (models) => {
        Genres.hasMany(models.Posts,{
            onDelete: "cascade"
        });


    };
    return Genres;
}