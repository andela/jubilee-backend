module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    preferredLanguage: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'EN'
    },
    preferredCurrency: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'dollar'
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zip: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    facebookId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    department: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lineManager: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
