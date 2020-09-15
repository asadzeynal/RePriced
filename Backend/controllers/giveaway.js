const giveawayService = require('../services/giveaway');
const afterGiveawayService = require('../services/afterGiveaway');

const getGiveaways = async (req, res) => {
  try {
    const query = req.query.status === undefined ? '' : { status: req.query.status };
    const giveaways = await giveawayService.getGiveaways(query);
    res.send(giveaways);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

const getGiveaway = async (req, res) => {
  try {
    const giveaway = await giveawayService.getGiveaway({ id: req.params.id });
    res.send(giveaway);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

const createGiveaway = async (req, res) => {
  try {
    const giveaway = await giveawayService.createGiveaway(req.body, req.user);
    res.send(giveaway);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const giveaway = await giveawayService.uploadPhoto(req.body, req.file);
    res.send(giveaway);
  } catch (e) {
    res.status(e.status || 500).send();
  }
}

const addGiveawayParticipant = async (req, res) => {
  try {
    const giveaway = await giveawayService.addGiveawayParticipant(req.params.id, req.user);
    res.send(giveaway);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

const deleteGiveaway = async (req, res) => {
  try {
    const giveaway = await giveawayService.deleteGiveaway(req.params.id, req.user.id);
    res.send(giveaway);
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

const modifyGiveaway = async (req, res) => {
  if (!req.body.status) {
    res.status(400).send();
    return;
  }
  try {
    if (req.body.status === 'winnerSelected') {
      const winnerId = await giveawayService.doGiveaway(req.params.id);
      if (winnerId) {
        res.send({ winnerId });
      } else {
        res.status(500).send();
      }
    } else if (req.body.status === 'productDelivered') {
      await afterGiveawayService.confirmDelivery(req.params.id, req.user);
      res.status(200).send();
    } else {
      res.status(500).send();
    }
  } catch (e) {
    res.status(e.status || 500).send();
  }
};

module.exports = {
  getGiveaways,
  getGiveaway,
  createGiveaway,
  addGiveawayParticipant,
  deleteGiveaway,
  modifyGiveaway,
  uploadPhoto,
};
