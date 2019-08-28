
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'supplierId', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'Suppliers',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }),
  down: (queryInterface) => queryInterface.removeColun('Users', 'supplierId')
};
