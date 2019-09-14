module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('AccommodationBookings', 'requestId', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Requests',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }),
  down: (queryInterface) => queryInterface.removeColumn('AccommodationBookings', 'requestId')
};
