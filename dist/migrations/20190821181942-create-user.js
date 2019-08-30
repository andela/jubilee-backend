"use strict";

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
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    preferredLanguage: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'EN'
    },
    preferredCurrency: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Naira'
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    street: {
      type: Sequelize.STRING,
      allowNull: true
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
      allowNull: true
    },
    zip: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    companyName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'user'
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    facebookId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    profileImage: {
      type: Sequelize.STRING
    },
    provider: {
      type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('Users')
};