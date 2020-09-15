const express = require('express');
const payment = require('../controllers/payment');

const router = express.Router();

router.post('/yandexPayment', payment.confirmYandexPayment);

module.exports = router;
