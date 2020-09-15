const models = require('../models');
const virtualTransactionService = require('./virtualTransaction');

const confirmYandexPayment = async (phone, sum, sender) => {
  const user = await models.UserModel.findOne({
    where: { phoneNumber: phone }
  });
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }
  let source;
  if (sender) {
    source = 'ym_' + sender;
  } else {
    source = 'ym_card'
  }
  await virtualTransactionService.createTransaction({
    type: 'deposit',
    amountInUsd: sum,
    source,
  }, user.id, giveaway);
};

module.exports = {
  confirmYandexPayment,
};