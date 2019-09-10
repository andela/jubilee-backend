
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: { type: DataTypes.STRING, allowNull: false },
    companyAddress: { type: DataTypes.STRING, allowNull: false },
    companyToken: {
      allowNull: true,
      type: DataTypes.STRING
    },
    companySizeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'CompanySize'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    companyPlanId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'CompanyPlan'
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
