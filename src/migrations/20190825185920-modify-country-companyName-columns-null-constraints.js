module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Users', 'country', {
      type: Sequelize.STRING,
      allowNull: true
    }),
    queryInterface.changeColumn('Users', 'companyName', {
      type: Sequelize.STRING,
      allowNull: true
    })
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Users', 'country', {
      type: Sequelize.STRING,
      allowNull: false
    }),
    queryInterface.changeColumn('Users', 'companyName', {
      type: Sequelize.STRING,
      allowNull: false
    })
  ])
};
