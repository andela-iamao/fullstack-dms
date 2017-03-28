module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      defaultValue: 'regular',
      type: DataTypes.STRING,
      validate: {
        isIn: [['admin', 'regular']]
      }
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          as: 'documents'
        });
      }
    }
  });
  return User;
};
