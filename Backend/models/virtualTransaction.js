module.exports = (sequelize, DataTypes) => {
  const VirtualTransactionModel = sequelize.define('virtual_transaction', {
    amountInUsd: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      required: true,
      get() {
        const value = this.getDataValue('amountInUsd');
        return value === null ? null : parseFloat(value);
      },
    },
    amountInSelectedCurrency: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: true,
      required: false,
      get() {
        const value = this.getDataValue('amountInSelectedCurrency');
        return value === null ? null : parseFloat(value);
      },
    },
    type: {
      type: DataTypes.ENUM,
      values: ['toGiveaway', 'toUser'],
    },
    currency: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {

    },
    underscored: true,
  });
  return VirtualTransactionModel;
};
