module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Facility'
      }
    },
    roomCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Category'
      }
    },
  }, {});
  Room.associate = (models) => {
    Room.belongsTo(models.Facility, {
      as: 'facility',
      foreignKey: 'facilityId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Room.belongsTo(models.Roomcategory, {
      as: 'category',
      foreignKey: 'categoryId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Room;
};
