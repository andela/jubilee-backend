module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define('supplier', {
    companyName: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    categoryOfServices: DataTypes.STRING
  }, {});
  supplier.associate = function(models) {
    // associations can be defined here
  };
  return supplier;
};