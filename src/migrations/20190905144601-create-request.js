module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    requesterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Users'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    managerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Users'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    accBookingId: {
      type: Sequelize.INTEGER
    },
    statusId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Statuses'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: true
    },
    rememberMe: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    tripType: {
      type: Sequelize.ENUM,
      values: ['One-way', 'Round-Trip', 'Multi-leg'],
      allowNull: false
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: false
    },
    departureDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    returnDate: {
      type: Sequelize.DATE,
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
  down: (queryInterface) => queryInterface.dropTable('Requests')
};
