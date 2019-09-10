module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.ENUM('companySuperAdmin', 'companyTravelAdmin', 'companyTravelTeamMember', 'unassigned',
        'companyManager', 'companyRequester', 'supplierSuperAdmin', 'supplierManager', 'supplierTeamMember'),
      allowNull: false,
      defaultValue: 'unassigned'
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('Roles')
};
