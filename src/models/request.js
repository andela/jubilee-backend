module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
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
    rememberUserData: {
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
    passportNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passportName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lineManager: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accommodation: {
      type: DataTypes.STRING,
      allowNull: true
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
      as: 'requester',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Request.belongsTo(models.User, {
      as: 'manager',
      foreignKey: 'managerId',
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
    Request.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'requestId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
