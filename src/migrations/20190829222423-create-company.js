
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Companies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    companyAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    companySizeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'CompanySizes'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    companyPlanId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'CompanyPlans'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  down: (queryInterface) => queryInterface.dropTable('Companies')
};
