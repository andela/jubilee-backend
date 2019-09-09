module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define('Facility', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        key: 'id',
        model: 'Supplier'
      }
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
    Facility.belongsTo(models.Supplier, {
      as: 'owner',
      foreignKey: 'supplierId',
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
  };
  return Facility;
};
