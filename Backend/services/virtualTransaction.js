const models = require('../models');
const userService = require('./user');
const sequelize = require('../db/sequelize');

const createTransaction = async (transactionBody, userId, giveaway) => {
  const transaction = new models.VirtualTransactionModel(transactionBody);
  const user = await userService.getUser({ id: userId });
  const userWallet = await user.getWallet();
  const giveawayWallet = await giveaway.getWallet();

  transaction.setWallet(userWallet, { save: false });
  transaction.setGiveawayWallet(giveawayWallet, { save: false });

  if (transactionBody.type === 'toUser') {
    userWallet.balance += transactionBody.amountInUsd;
    giveawayWallet.balance -= transactionBody.amountInUsd;
  } else if (transactionBody.type === 'toGiveaway') {
    if (userWallet.balance < transactionBody.amountInUsd) {
      const error = new Error('Not enough money on user\'s balance');
      error.status = 400;
      throw error;
    }
    userWallet.balance -= transactionBody.amountInUsd;
    giveawayWallet.balance += transactionBody.amountInUsd;
  }
  let sequelizeTransaction;
  try {
    sequelizeTransaction = await sequelize.transaction();
    await transaction.save({ transaction: sequelizeTransaction });
    await userWallet.save({ transaction: sequelizeTransaction });
    await giveawayWallet.save({ transaction: sequelizeTransaction });
    await sequelizeTransaction.commit();
  } catch (e) {
    if (sequelizeTransaction) await sequelizeTransaction.rollback();
    throw e;
  }
};

module.exports = {
  createTransaction,
};
