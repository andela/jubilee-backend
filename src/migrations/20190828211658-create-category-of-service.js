module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CategoryOfServices', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    categoryDescription: {
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('CategoryOfServices')
};
