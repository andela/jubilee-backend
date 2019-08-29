module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Suppliers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    companyName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    companyAddress: {
      allowNull: false,
      type: Sequelize.STRING
    },
    categoryOfServices: {
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('Suppliers')
};
