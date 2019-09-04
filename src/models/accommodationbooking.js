module.exports = (sequelize, DataTypes) => {
  const AccommodationBooking = sequelize.define(
    'AccommodationBooking',
    {
      fullname: { type: DataTypes.STRING, allowNull: false },
      checkIn: { type: DataTypes.DATEONLY, allowNull: false },
      checkOut: { type: DataTypes.DATEONLY, allowNull: false }
    },
    {}
  );
  AccommodationBooking.associate = models => {
    // associations can be defined here
  };
  return AccommodationBooking;
};
