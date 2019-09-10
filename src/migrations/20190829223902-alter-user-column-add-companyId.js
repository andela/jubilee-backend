
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users',
    'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }),

  down: (queryInterface) => queryInterface.removeColumn('Users', 'companyId')
};
