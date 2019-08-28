module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('suppliers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    companyName: {
      type: Sequelize.STRING
    },
    companyAddress: {
      type: Sequelize.STRING
    },
    categoryOfServices: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('suppliers')
};
