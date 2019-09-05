module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    facilityId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    roomCount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
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
  down: (queryInterface) => queryInterface.dropTable('Rooms')
};
