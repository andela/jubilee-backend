module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Facility'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    roomCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
<<<<<<< HEAD
    roomCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    occupancyCount: {
      type: DataTypes.INTEGER,
=======
    occupancyCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
>>>>>>> feature(company-facility): add create facility functionality
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    roomCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'RoomCategory'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    }
  }, {});

  Room.associate = (models) => {
<<<<<<< HEAD
    Room.belongsTo(models.Facility, {
      as: 'facility',
      foreignKey: 'facilityId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Room.belongsTo(models.RoomCategory, {
      as: 'roomCategory',
      foreignKey: 'roomCategoryId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
=======
    Room.belongsTo(models.Facility, { foreignKey: 'facilityId', as: 'company' });
    Room.belongsTo(models.RoomCategory, { foreignKey: 'roomCategoryId', as: 'roomCategory' });
>>>>>>> feature(company-facility): add create facility functionality
  };

  return Room;
};
