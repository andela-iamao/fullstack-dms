

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          as: 'owner',
          onDelete: 'CASCADE',
          foreignKey: 'ownerId'
        });

        Document.belongsTo(models.Type, {
          as: 'type',
          onDelete: 'CASCADE',
          foreignKey: 'typeId'
        });
      }
    }
  });
  return Document;
};
