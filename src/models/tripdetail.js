module.exports = (sequelize, DataTypes) => {
  const TripDetail = sequelize.define('TripDetail', {
    origin: { type: DataTypes.STRING, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    departureDate: { type: DataTypes.DATE, allowNull: false },
    returnDate: { type: DataTypes.DATE, allowNull: true },
    requestId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference: {
        key: 'id',
        model: 'Request'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  TripDetail.associate = (models) => {
    TripDetail.belongsTo(models.Request, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      timestamps: false
    });
  };
  return TripDetail;
};
