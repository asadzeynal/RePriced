const express = require('express');
const giveaway = require('../controllers/giveaway');

const router = express.Router();

router.get('/giveaways', giveaway.getGiveaways);//get all inited giveaways
router.get('/giveaways/:id', giveaway.getGiveawayInfo);//get info about specified giveaway
router.put('/giveaways/:id', giveaway.updateGiveaway);



//product and giveaway / through giveaway id
//giveaway service include

module.exports = router;
