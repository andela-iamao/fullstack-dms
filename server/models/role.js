module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    title: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User);
        Role.hasMany(models.Document);
      }
    }
  });
  return Role;
};
