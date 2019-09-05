module.exports = (sequelize, DataTypes) => {
  const AmenityFacility = sequelize.define('AmenityFacility', {
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
    amenityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Amenity'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  AmenityFacility.associate = (models) => {
    AmenityFacility.belongsTo(models.Facility, { foreignKey: 'facilityId' });
    AmenityFacility.belongsTo(models.Amenity, { foreignKey: 'amenityId' });
  };
  return AmenityFacility;
};
