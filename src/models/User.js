module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      birthdate: { type: DataTypes.DATE, allowNull: true },
      preferredLanguage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'EN'
      },
      preferredCurrency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Naira'
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
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
      country: { type: DataTypes.STRING, allowNull: true },
      zip: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.STRING, allowNull: true },
      passportNumber: { type: DataTypes.STRING, allowNull: true },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Suppliers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      companyName: { type: DataTypes.STRING, allowNull: true },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Company',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      password: { type: DataTypes.STRING, allowNull: true },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      department: { type: DataTypes.STRING, allowNull: true },
      lineManager: { type: DataTypes.STRING, allowNull: true }
    },
    {}
  );
  User.associate = (models) => {
    User.belongsTo(models.Supplier, {
      foreignKey: 'supplierId',
      as: 'supplier',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    User.belongsToMany(models.Role, {
      through: 'RoleUsers',
      as: 'roles',
      foreignKey: 'userId'
    });
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Request, {
      foreignKey: 'requesterId',
      as: 'requests',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return User;
};
