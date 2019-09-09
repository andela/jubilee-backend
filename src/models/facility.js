
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
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        'Abia',
        'Adamawa',
        'Anambra',
        'Akwa Ibom',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Enugu',
        'Edo',
        'Ekiti',
        'Abuja',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
      ]
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
  };
  return Facility;
};
