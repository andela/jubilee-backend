module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    supplierName: { type: DataTypes.STRING, allowNull: false },
    supplierAddress: { type: DataTypes.STRING, allowNull: false },
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
  };
  return Supplier;
};
