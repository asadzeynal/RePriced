const giveawayService = require('../services/giveaway');

//get all giveaways
const getGiveaways = async (req, res) => {
  try {
    const query = {status: 'inited'};
    const giveaways = await giveawayService.getGiveaways(query);
    res.send(giveaways);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

//get detailed info about specific giveaway
const getGiveawayInfo = async (req, res) => {
  try {
    const giveawayInfo = await giveawayService.getGiveawayInfo({ id: req.params.id });
    console.log(req.params.id);
    res.send(giveawayInfo);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

//update specific giveaway
const updateGiveaway = async(req, res) => {
  try {
      giveawayService.updateGiveaway(req.body, {id: req.params.id})
    .then(updatedPGiveaway => {
          res.send(updatedGiveaway);
        })
        .catch(err => res.json(err));
  } catch (e){
    res.status(e.status || 500).send();
  }
};

module.exports = {
  getGiveaways,
  getGiveawayInfo,
  updateGiveaway
};
