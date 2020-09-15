const models = require('../models');
const virtualTransactionService = require('./virtualTransaction');

const confirmDelivery = async (giveawayID, user) => {
  const giveaway = await models.GiveawayModel.findByPk(giveawayID, {
    include: [{
      model: models.GiveawayWalletModel,
      as: 'wallet',
      attributes: ['balance'],
    }],
  });

  if (giveaway.winner_id !== user.id) {
    const error = new Error('You are not the winner of this giveaway');
    error.status = 400;
    throw error;
  }
  giveaway.status = 'productDelivered';
  const sum = giveaway.wallet.balance;
  await virtualTransactionService.createTransaction({
    type: 'toUser',
    amountInUsd: sum,
  }, giveaway.owner_id, giveaway);
  giveaway.save();
  return giveaway;
};

module.exports = {
  confirmDelivery,
};
