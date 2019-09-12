module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AccommodationBookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    checkIn: {
      type: Sequelize.DATEONLY
    },
    checkOut: {
      type: Sequelize.DATEONLY
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
  down: (queryInterface) => queryInterface.dropTable('AccommodationBookings')
};
