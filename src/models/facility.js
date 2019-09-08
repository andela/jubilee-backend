
module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define('Facility', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyType: {
      type: DataTypes.ENUM,
      values: ['company', 'supplier'],
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        key: 'id',
        model: 'Supplier'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addOns: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {});
  Facility.associate = (models) => {
<<<<<<< HEAD
    Facility.belongsTo(models.Supplier, {
      as: 'owner',
      foreignKey: 'supplierId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Facility.belongsTo(models.Company, {
      foriegnKey: 'companyId',
      as: 'company',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Facility.hasMany(models.Room, {
      as: 'rooms',
      foreignKey: 'facilityId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Facility.belongsToMany(models.Amenity, {
      through: 'AmenityFacilities',
      as: 'amenities',
      foreignKey: 'facilityId'
    });
=======
    Facility.hasMany(models.Room, { foreignKey: 'facilityId', as: 'rooms' });
    Facility.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    Facility.belongsToMany(models.Amenity, { through: models.FacilityAmenity, as: 'amenities', foreignKey: 'facilityId' });
>>>>>>> feature(company-facility): add create facility functionality
  };
  return Facility;
};
