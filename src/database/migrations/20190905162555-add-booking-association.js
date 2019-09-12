module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('AccommodationBookings', 'roomId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }).then(() => queryInterface.addColumn('AccommodationBookings', 'userId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })),

  down: (queryInterface) => queryInterface.removeColumn('AccommodationBookings', 'roomId').then(() => queryInterface.removeColumn('AccommodationBookings', 'userId'))
};
