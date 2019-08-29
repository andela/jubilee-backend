module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      label: {
        type: DataTypes.ENUM('companySuperAdmin', 'companyTravelAdmin', 'companyTravelTeamMember', 'unassigned',
          'companyManager', 'companyRequester', 'supplierSuperAdmin', 'supplierManager', 'supplierTeamMenber'),
        allowNull: false,
        defaultValue: 'unassigned'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Role.associate = (models) => {
    // add model as function parameter and define associations here
    Role.belongsToMany(models.User, {
      through: 'RoleUsers',
      as: 'users',
      foreignKey: 'roleId'
    });
  };
  return Role;
};
