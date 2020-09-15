module.exports = (sequelize, DataTypes) => {
  const TokenModel = sequelize.define('token', {
    hash: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {
  });
  return TokenModel;
};
