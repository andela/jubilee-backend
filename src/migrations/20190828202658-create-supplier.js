module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Suppliers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    supplierName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    supplierAddress: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Suppliers')
};
