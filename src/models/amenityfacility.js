module.exports = (sequelize, DataTypes) => {
  const AmenityFacility = sequelize.define('AmenityFacility', {
    amenityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facilityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  AmenityFacility.associate = () => {
  };
  return AmenityFacility;
};
