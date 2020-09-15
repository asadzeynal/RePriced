const paymentService = require('../services/payment');

const confirmYandexPayment = async (req, res) => {
  await paymentService.confirmYandexPayment(req.body.phone, req.body.amount, req.body.sender);
  res.send();
};

module.exports = {
  confirmYandexPayment,
};
