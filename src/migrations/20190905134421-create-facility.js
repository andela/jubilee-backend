module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Facilities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    companyType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    supplierId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    addOns: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
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
  down: (queryInterface) => queryInterface.dropTable('Facilities')
};
