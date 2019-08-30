
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: { type: DataTypes.STRING, allowNull: false },
    companyAddress: { type: DataTypes.STRING, allowNull: false },
    companySizeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'CompanySizes'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    companyPlanId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'CompanyPlans'
      }
    }
  }, {});
  Company.associate = (models) => {
    Company.hasMany(models.User, {
      as: 'employees',
      foreignKey: 'companyId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Company.belongsTo(models.CompanySize, {
      as: 'size',
      foreignKey: 'companySizeId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Company.belongsTo(models.CompanyPlan, {
      as: 'plan',
      foreignKey: 'companyPlanId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Company;
};
