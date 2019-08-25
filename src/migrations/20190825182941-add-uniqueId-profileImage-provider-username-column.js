module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'uniqueId', {
      type: Sequelize.STRING,
      allowNull: true
    }),
    queryInterface.addColumn('Users', 'profileImage', {
      type: Sequelize.STRING,
      allowNull: true
    }),
    queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: true
    }),
    queryInterface.addColumn('Users', 'provider', {
      type: Sequelize.STRING,
      allowNull: true
    })
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Users', 'uniqueId'),
    queryInterface.removeColumn('Users', 'profileImage'),
    queryInterface.removeColumn('Users', 'username'),
    queryInterface.removeColumn('Users', 'provider')
  ])
};
