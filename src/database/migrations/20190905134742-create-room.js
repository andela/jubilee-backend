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
    roomCost: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    occupancyCount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    roomCategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'RoomCategories'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
