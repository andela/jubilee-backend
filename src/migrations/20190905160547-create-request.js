
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    requesterId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'Users'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    managerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'Users'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    accBookingId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'accommodationBookings'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    purpose: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'approved', 'rejected'],
      allowNull: false
    },
    tripType: {
      type: Sequelize.ENUM,
      values: ['one-way', 'round-trip', 'multi-leg'],
      allowNull: false
    },
    origin: {
      type: Sequelize.STRING
    },
    destination: {
      type: Sequelize.STRING
    },
    departureDate: {
      type: Sequelize.DATE
    },
    returnDate: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('requests')
};
