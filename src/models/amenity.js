module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Amenity.associate = (models) => {
    Amenity.belongsToMany(models.Facility, {
      through: 'AmenityFacilities',
      as: 'facilities',
      foreignKey: 'amenityId'
    });
  };
  return Amenity;
};
