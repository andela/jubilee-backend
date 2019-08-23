'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.DATE, allowNull: true },
    preferredLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'EN'
    },
    preferredCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Naira'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    gender: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    companyName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    facebookId: { type: DataTypes.STRING, allowNull: true },
    googleId: { type: DataTypes.STRING, allowNull: true },
    department: { type: DataTypes.STRING, allowNull: true },
    lineManager: { type: DataTypes.STRING, allowNull: true }
  }, {});
  return User;
};
