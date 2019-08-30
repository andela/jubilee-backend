
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CompanyPlans', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.ENUM,
      values: ['Silver', 'Gold', 'Platinum'],
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('CompanyPlans')
};
