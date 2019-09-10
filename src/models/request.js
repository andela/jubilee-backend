module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2,
      references: {
        model: 'Statuses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rememberMe: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    tripType: {
      type: DataTypes.ENUM,
      values: ['One-way', 'Round-Trip', 'Multi-leg'],
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'requesterId',
      as: 'requester'
    });
    Request.belongsTo(models.User, {
      as: 'manager',
      foreignKey: 'managerId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Request.belongsTo(models.Status, {
      as: 'status',
      foreignKey: 'statusId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Request.hasMany(models.AccommodationBooking, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
