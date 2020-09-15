module.exports = (sequelize, DataTypes) => {
  const ConversationModel = sequelize.define('conversation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return ConversationModel;
};
