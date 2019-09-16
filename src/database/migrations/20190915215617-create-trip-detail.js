module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: false
    },
    departureDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    returnDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    requestId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        key: 'id',
        model: 'Requests'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  down: (queryInterface) => queryInterface.dropTable('TripDetails')
};
