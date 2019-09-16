module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Requests',
      'nameAsOnPassport',
      {
        type: Sequelize.STRING
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'passportNumber',
      {
        type: Sequelize.STRING
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'gender',
      {
        type: Sequelize.STRING
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'others',
      {
        type: Sequelize.STRING
      }
    ),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Requests', 'nameAsOnPassport'),
    queryInterface.removeColumn('Requests', 'passportNumber'),
    queryInterface.removeColumn('Requests', 'gender'),
    queryInterface.removeColumn('Requests', 'others')
  ])
};
