const models = require('../models');
const userService = require('./user');
const sequelize = require('../db/sequelize');

const createTransaction = async (transactionBody, userId, giveaway) => {
  const transaction = new models.RealTransactionModel(transactionBody);
  const user = await userService.getUser({ id: userId });
  const userWallet = await user.getWallet();

  transaction.setWallet(userWallet, { save: false });

  if (transactionBody.type === 'deposit') {
    userWallet.balance += transactionBody.amountInUsd;
  } else if (transactionBody.type === 'withdrawal') {
    if (userWallet.balance < transactionBody.amountInUsd) {
      const error = new Error('Not enough money on user\'s balance');
      error.status = 400;
      throw error;
    }
    userWallet.balance -= transactionBody.amountInUsd;
  }
  let sequelizeTransaction;
  try {
    sequelizeTransaction = await sequelize.transaction();
    await transaction.save({ transaction: sequelizeTransaction });
    await userWallet.save({ transaction: sequelizeTransaction });
    await sequelizeTransaction.commit();
  } catch (e) {
    if (sequelizeTransaction) await sequelizeTransaction.rollback();
    throw e;
  }
};

module.exports = {
  createTransaction,
};
