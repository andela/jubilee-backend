module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Facility'
      },
      onDelete: 'CASADE',
      onUpdate: 'CASCADE'
    },
    roomCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    occupancyCount: {
      type: DataTypes.INTEGER,
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
      onDelete: 'CASADE',
      onUpdate: 'CASCADE'

    }
  }, {});

  Room.associate = (models) => {
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
  };

  return Room;
};
