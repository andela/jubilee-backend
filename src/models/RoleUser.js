module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define(
    'RoleUser',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {}
  );
  RoleUser.associate = () => {
    // add model as function parameter and define associations here
  };
  return RoleUser;
};
