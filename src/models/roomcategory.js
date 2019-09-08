
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
<<<<<<< HEAD
<<<<<<< HEAD
    RoomCategory.hasMany(models.Room, {
      as: 'rooms',
      foreignKey: 'roomCategoryId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
=======
    RoomCategory.hasMany(models.Room, { foreignKey: 'roomCategoryId', as: 'rooms' });
>>>>>>> feature(company-facility): add create facility functionality
=======
    RoomCategory.hasMany(models.Room, { foreignKey: 'roomCategoryId', as: 'rooms' });
>>>>>>> feature(company-facility): add create facility functionality
  };
  return RoomCategory;
};
