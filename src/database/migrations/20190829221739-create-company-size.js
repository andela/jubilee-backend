module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CompanySizes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.ENUM,
      values: ['1-10', '11-50', '51-100', '101-above'],
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
  down: (queryInterface) => queryInterface.dropTable('CompanySizes')
};
