module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Statuses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    label: {
      type: Sequelize.ENUM,
      values: ['Pending', 'Rejected', 'Approved'],
      defaultValue: 'Pending',
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
  down: (queryInterface) => queryInterface.dropTable('Statuses')
};
