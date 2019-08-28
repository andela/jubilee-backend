module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    supplierName: { type: DataTypes.STRING, allowNull: false },
    supplierAddress: { type: DataTypes.STRING, allowNull: false },
    categoryOfServices: { type: DataTypes.STRING, allowNull: false }
  }, {});
  Supplier.associate = (models) => {
    Supplier.hasMany(models.User, {
      foreignKey: 'supplierId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Supplier;
};
