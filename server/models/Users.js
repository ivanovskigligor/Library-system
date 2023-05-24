module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutme: {
      type: DataTypes.STRING,
    },
    profilephoto: {
      type: DataTypes.STRING,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Rating, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  };

  return Users;
}