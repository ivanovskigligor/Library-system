module.exports = (sequelize, DataTypes) =>{
    const Posts = sequelize.define("Posts", {
        title : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        postText : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postphoto : {
            type: DataTypes.STRING,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments,{
            onDelete: "cascade"
        });

        Posts.hasMany(models.Rating,{
            onDelete: "cascade"
        });

    };

    return Posts;
}