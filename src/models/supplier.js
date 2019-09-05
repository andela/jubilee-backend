Supplier
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    companyName: { type: DataTypes.STRING, allowNull: false },
    companyAddress: { type: DataTypes.STRING, allowNull: false },
    companyToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryOfServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CategoryOfServices',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  Supplier.associate = (models) => {
    Supplier.hasMany(models.User, {
      foreignKey: 'supplierId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Supplier.belongsTo(models.CategoryOfService, {
      foreignKey: 'categoryOfServiceId',
      as: 'service'
    });
    Supplier.hasMany(models.Facility, {
      foreignKey: 'supplierId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Supplier;
};
