module.exports = (sequelize, DataTypes) => {
  const CategoryOfService = sequelize.define('CategoryOfService', {
    categoryName: { type: DataTypes.STRING, allowNull: false },
    categoryDescription: { type: DataTypes.STRING, allowNull: false }
  }, {});
  CategoryOfService.associate = (models) => {
    CategoryOfService.hasMany(models.Supplier, {
      foreignKey: 'categoryOfServiceId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return CategoryOfService;
};
