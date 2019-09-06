module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    label: { type: DataTypes.STRING, allowNull: false }
  }, {});
  Status.associate = (models) => {
    Status.hasMany(models.Request, {
      as: 'requests',
      foreignKey: 'statusId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Status;
};
