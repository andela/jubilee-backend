module.exports = (sequelize, DataTypes) => {
  const AccommodationBooking = sequelize.define(
    'AccommodationBooking',
    {
      checkIn: { type: DataTypes.DATEONLY, allowNull: false },
      checkOut: { type: DataTypes.DATEONLY, allowNull: false },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: 'id',
          model: 'Users'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      roomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: 'id',
          model: 'Rooms'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {}
  );
  AccommodationBooking.associate = (models) => {
    AccommodationBooking.belongsTo(models.Room, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    AccommodationBooking.belongsTo(models.User, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    AccommodationBooking.belongsTo(models.Request, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  };
  return AccommodationBooking;
};
