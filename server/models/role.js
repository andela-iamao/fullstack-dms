

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, {
          as: 'users',
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};
