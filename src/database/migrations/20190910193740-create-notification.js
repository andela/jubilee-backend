module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM(),
      values: ['seen', 'unseen'],
      allowNull: false,
      defaultValue: 'unseen'
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
  down: (queryInterface) => queryInterface.dropTable('Notifications')
};
