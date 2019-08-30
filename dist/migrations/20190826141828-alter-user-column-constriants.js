"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([queryInterface.changeColumn('Users', 'firstName', {
    type: Sequelize.STRING,
    allowNull: false
  }), queryInterface.changeColumn('Users', 'lastName', {
    type: Sequelize.STRING,
    allowNull: false
  }), queryInterface.changeColumn('Users', 'birthdate', {
    type: Sequelize.DATE,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'preferredLanguage', {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'EN'
  }), queryInterface.changeColumn('Users', 'preferredCurrency', {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'Naira'
  }), queryInterface.changeColumn('Users', 'email', {
    type: Sequelize.STRING,
    allowNull: true,
    isEmail: true,
    unique: true
  }), queryInterface.changeColumn('Users', 'gender', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'street', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'city', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'state', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'country', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'zip', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'phoneNumber', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'companyName', {
    type: Sequelize.STRING,
    allowNull: true
  }), queryInterface.changeColumn('Users', 'password', {
    type: Sequelize.STRING,
    allowNull: true
  })]),
  down: queryInterface => queryInterface.dropTable('Users')
};