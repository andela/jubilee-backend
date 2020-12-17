module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Requests',
      'passportNumber', {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'passportName', {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'lineManager', {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'accommodation', {
        type: Sequelize.STRING,
        allowNull: true
      }
    ),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Requests', 'passportNumber'),
    queryInterface.removeColumn('Requests', 'passportName'),
    queryInterface.removeColumn('Requests', 'lineManager'),
    queryInterface.removeColumn('Requests', 'accommodation')
  ])
};
