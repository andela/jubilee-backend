module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Requests', 'managerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Users'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }),
    queryInterface.addColumn('Requests', 'extraInfo', { type: Sequelize.TEXT, allowNull: true }),
    queryInterface.removeColumn('Requests', 'origin', { type: Sequelize.STRING, allowNull: false }),
    queryInterface.removeColumn('Requests', 'destination', { type: Sequelize.STRING, allowNull: false }),
    queryInterface.removeColumn('Requests', 'departureDate', { type: Sequelize.DATE, allowNull: false }),
    queryInterface.removeColumn('Requests', 'returnDate', { type: Sequelize.DATE, allowNull: false }),
  ]),

  down: (queryInterface) => queryInterface.dropTable('Requests')
};
