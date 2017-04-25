module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, { foreignKey: 'roleId' });
        Role.hasMany(models.Document, { foreignKey: 'roleId' });
      }
    }
  });
  return Role;
};
