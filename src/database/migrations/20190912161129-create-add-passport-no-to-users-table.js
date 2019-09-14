module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users',
    'passportNumber', {
      type: Sequelize.STRING(),
      allowNull: true,
    }),

  down: (queryInterface) => queryInterface.removeColumn('Users', 'passportNo')
};
