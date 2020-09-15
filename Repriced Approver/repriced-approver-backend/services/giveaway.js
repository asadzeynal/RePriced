const models = require('../models');

//Get all giveaways
const getGiveaways = async (query) => {
  const giveaways = await models.GiveawayModel.findAll({
    attributes: ['id','costByParticipant', 'expirationDate', 'status', 'participantsLimit', 'createdAt'],
    where: query
  });
  return giveaways;
};

//Get info about specific giveaway
const getGiveawayInfo = async (query) => {
  const giveawayInfo = await models.GiveawayModel.findOne({
    where: query,
    include: [{
      model: models.ProductModel,
      as: 'product',
      attributes: ['title', 'description', 'photos', 'category'],
    }, {
      model: models.UserModel,
      as: 'participants',
      attributes: ['id'],
    }, {
      model: models.UserModel,
      attributes: ['firstName', 'lastName', 'username', 'country', 'city'],
      as: 'owner',
    }],
  });
  if (!giveawayInfo) {
    const error = new Error('Giveaway not found');
    error.status = 404;
    throw error;
  }
  return giveawayInfo;
};

const updateGiveaway = async(data, query) => {
  const updatedGiveaway = await models.GiveawayModel.update(
    data, {where: query}
  );
  const updateProduct = await models.ProductModel.update(
    data.product, {where: {id: data.product_id}}
  );
  return updatedGiveaway[1].dataValues;
};

module.exports = {
  getGiveaways,
  getGiveawayInfo,
  updateGiveaway
};
