
module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('Users', 'role'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'role', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Suppliers',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
};
