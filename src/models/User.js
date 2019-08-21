'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zip: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    companyName: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    googleId: DataTypes.STRING,
    department: DataTypes.STRING,
    lineManager: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};