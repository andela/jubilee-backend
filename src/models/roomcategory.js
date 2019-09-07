module.exports = (sequelize, DataTypes) => {
  const RoomCategory = sequelize.define('RoomCategory', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  RoomCategory.associate = (models) => {
    RoomCategory.hasMany(models.Room, {
      as: 'rooms',
      foreignKey: 'roomCategoryId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return RoomCategory;
};
