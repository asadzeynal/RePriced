module.exports = (sequelize, DataTypes) => {
  const RealTransactionModel = sequelize.define('real_transaction', {
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
      allowNull: false,
      required: true,
      get() {
        const value = this.getDataValue('amountInSelectedCurrency');
        return value === null ? null : parseFloat(value);
      },
    },
    source: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['deposit', 'withdrawal'],
    },
    currency: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });
  return RealTransactionModel;
};
