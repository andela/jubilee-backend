'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      birthdate: { type: Sequelize.DATE, allowNull: true },
      preferredLanguage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'EN'
      },
      preferredCurrency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Naira'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true
      },
      gender: { type: Sequelize.STRING, allowNull: true },
      street: { type: Sequelize.STRING, allowNull: true },
      city: { type: Sequelize.STRING, allowNull: true },
      state: { type: Sequelize.STRING, allowNull: true },
      country: { type: Sequelize.STRING, allowNull: false },
      zip: { type: Sequelize.STRING, allowNull: true },
      phoneNumber: { type: Sequelize.STRING, allowNull: true },
      companyName: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: true },
      role: { type: Sequelize.STRING, allowNull: false, defaultValue: 'user' },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      facebookId: { type: Sequelize.STRING, allowNull: true },
      googleId: { type: Sequelize.STRING, allowNull: true },
      department: { type: Sequelize.STRING, allowNull: true },
      lineManager: { type: Sequelize.STRING, allowNull: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => queryInterface.dropTable('Users')
};
