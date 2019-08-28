
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Suppliers', 'categoryOfServices'),
    queryInterface.addColumn(
      'Suppliers',
      'categoryOfServiceId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CategoryOfServices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'categoryOfServiceId'),
    queryInterface.addColumn('categoryOfServices', {
      allowNull: false,
      type: Sequelize.STRING
    }),
  ])
};
