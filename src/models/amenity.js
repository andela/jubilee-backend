module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Amenity.associate = (models) => {
<<<<<<< HEAD
    Amenity.belongsToMany(models.Facility, {
      through: 'AmenityFacilities',
      as: 'facilities',
      foreignKey: 'amenityId'
    });
=======
    Amenity.belongsToMany(models.Facility, { through: models.FacilityAmenity, as: 'facilities', foreignKey: 'amenityId' });
>>>>>>> feature(company-facility): add create facility functionality
  };
  return Amenity;
};
