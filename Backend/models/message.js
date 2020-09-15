module.exports = (sequelize, DataTypes) => {
  const MessageModel = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {
    underscored: true,
  });
  return MessageModel;
};
