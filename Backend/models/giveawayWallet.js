module.exports = (sequelize, DataTypes) => {
  const GiveawayWalletModel = sequelize.define('giveaway_wallet', {
    balance: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      required: true,
      defaultValue: 0,
      get() {
        const value = this.getDataValue('balance');
        return value === null ? null : parseFloat(value);
      },
    },
    currency: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });
  return GiveawayWalletModel;
};
