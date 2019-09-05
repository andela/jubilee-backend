module.exports = (sequelize, DataTypes) => {
  const Roomcategory = sequelize.define('Roomcategory', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Roomcategory.associate = (models) => {
    Roomcategory.hasMany(models.Room, {
      as: 'rooms',
      foreignKey: 'categoryId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Roomcategory;
};
