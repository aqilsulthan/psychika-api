import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Chat extends Model {}

  Chat.init({
userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    messages: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    stream: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    modelName: 'Chat',
    tableName: 'chats',
    sequelize,
    paranoid: true,
    timestamps: true,
  });

  return Chat;
}
