
module.exports = (sequelize, DataTypes) => {
  const CompanyPlan = sequelize.define('CompanyPlan', {
    label: { type: DataTypes.STRING, allowNull: false }
  }, {});
  CompanyPlan.associate = (models) => {
    CompanyPlan.hasMany(models.Company, {
      as: 'companies',
      foreignKey: 'companyPlanId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return CompanyPlan;
};
