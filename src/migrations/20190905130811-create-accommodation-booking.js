
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accommodationBookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'Users'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    roomId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    checkIn: {
      allowNull: false,
      type: Sequelize.DATE
    },
    checkOut: {
      allowNull: false,
      type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('accommodationBookings')
};
