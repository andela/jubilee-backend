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
      role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'user' },
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
<<<<<<< HEAD
    User.belongsTo(models.Supplier, {
      foreignKey: 'supplierId',
      as: 'affiliateSupplier'
    });
    User.belongsToMany(models.Role, {
      through: 'RoleUsers',
      as: 'roles',
      foreignKey: 'userId'
    });
=======
>>>>>>> feature(database): setup database for company signup
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
