
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Requests', 'managerId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'Users'
        }
      })),

  down: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Requests', 'managerId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: 'Users'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
  )
};
