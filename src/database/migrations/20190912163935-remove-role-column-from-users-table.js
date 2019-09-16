
module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('Users', 'role'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'role', {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'user'
  })
};
