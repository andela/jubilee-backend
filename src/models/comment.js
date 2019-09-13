
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    message: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference: {
        key: 'id',
        model: 'User'
      }
    },
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
  Comment.associate = (models) => {
    Comment.belongsTo(models.Request, {
      as: 'request',
      foreignKey: 'requestId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'userId',
    });
  };
  return Comment;
};
