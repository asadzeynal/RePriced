const async = require('async');
const { Client } = require('@elastic/elasticsearch');
const models = require('../models');
const virtualTransactionService = require('./virtualTransaction');
const mailer = require('../config/mailer');
const s3 = require('../config/aws');

const elasticClient = new Client({ node: process.env.ELASTIC_SEARCH_URL });

const doGiveaway = async (giveawayID) => {
  const giveaway = await models.GiveawayModel.findByPk(giveawayID, {
    include: [{
      model: models.UserModel,
      as: 'participants',
    }, {
      model: models.ProductModel,
      as: 'product',
    }],
  });
  if (giveaway.status === 'winnerSelected') {
    const error = new Error('Winner for this giveaway already selected');
    error.status = 400;
    throw error;
  }
  if (giveaway.participants.length < 0) {
    const error = new Error('There are no users participating!');
    error.status = 400;
    throw error;
  }
  const winner = Math.floor(Math.random() * giveaway.participants.length);
  await giveaway.setWinner(giveaway.participants[winner].id);
  const winnerObject = await models.UserModel.findByPk(giveaway.participants[winner].id);
  const owner = await giveaway.getOwner();
  await mailer.send({
    from: 'Repriced Team <dev@repriced.ru>',
    to: winnerObject.email,
    subject: 'You won a giveaway!',
    text: `Congratulations! Giveaway ${giveaway.product.title} is finished and you are the winner! Visit your profile for future details.`,
  });
  await mailer.send({
    from: 'Repriced Team <dev@repriced.ru>',
    to: owner.email,
    subject: `Your giveaway "${giveaway.product.title}" is over!`,
    text: `Congratulations! Giveaway ${giveaway.product.title}, that you own is over. Visit your profile for future delivery and money transfer details.`,
  });
  giveaway.participants.forEach(async (user) => {
    if (user.id !== winnerObject.id) {
      await mailer.send({
        from: 'Repriced Team <dev@repriced.ru>',
        to: user.email,
        subject: `Giveaway "${giveaway.product.title}" is over!`,
        text: `Giveaway ${giveaway.product.title}, that you participate, in is over. Unfortunately, your luck was not best this time. Good luck in your next giveaway.`,
      });
    }
  });
  giveaway.status = 'winnerSelected';
  giveaway.save();
  return (giveaway.participants[winner].id);
};

const getGiveaways = async (query) => {
  const giveaways = await models.GiveawayModel.findAll({
    where: query,
    include: [{
      model: models.ProductModel,
      as: 'product',
      attributes: ['id', 'title', 'description', 'category'],
    }],
  });
  return giveaways;
};

const getGiveaway = async (query) => {
  const giveaway = await models.GiveawayModel.findOne({
    where: query,
    include: [{
      model: models.ProductModel,
      as: 'product',
      attributes: ['id', 'title', 'description', 'photos', 'category'],
    }, {
      model: models.UserModel,
      as: 'participants',
      attributes: ['id'],
    }, {
      model: models.UserModel,
      as: 'owner',
    }],
  });
  if (!giveaway) {
    const error = new Error('Giveaway not found');
    error.status = 404;
    throw error;
  }
  return giveaway;
};

const createGiveaway = async (body, owner) => {
  const {
    title, description, cost, category, expirationDate, photos,
  } = body;

  const expiration = new Date(expirationDate.year, expirationDate.month, expirationDate.day);
  const product = await models.ProductModel.create(
    {
      title, description, cost, category,
    },
  );
  const costByParticipant = cost / 100;
  const giveaway = new models.GiveawayModel({
    expirationDate: expiration,
    status: 'incomplete',
    participantsLimit: 100,
    costByParticipant,
  });
  giveaway.setOwner(owner, { save: false });
  giveaway.setProduct(product, { save: false });
  const saved = await giveaway.save();
  // const searchJson = saved.dataValues;
  // const prod = await giveaway.getProduct();
  // searchJson.product = prod.dataValues;
  // delete searchJson.winner_id;
  // const res = await elasticClient.index({
  //   index: 'giveaways',
  //   body: searchJson,
  // });
  const array = [];
  if (photos) {
    async.forEachOf(photos, (file, i, callback) => {
      s3.upload(Buffer.from(file.split(',')[1], 'base64'), giveaway.id, i + '.png').then((data) => {
        array.push(data.Location);
        callback();
      });
    }, async (err) => {
      await product.update({ photos: array });
      await saved.setWallet(models.GiveawayWalletModel.build());
    });
  }
  return saved;
};

const addGiveawayParticipant = async (giveawayId, user) => {
  const giveaway = await models.GiveawayModel.findByPk(giveawayId, {
    include: ['participants'],
  });
  if (!giveaway) {
    const error = new Error('Giveaway not found');
    error.status = 404;
    throw error;
  }
  if (giveaway.ownerId === user.id) {
    const error = new Error('User cannot participate in his own giveaway');
    error.status = 400;
    throw error;
  }
  if (await giveaway.hasParticipants(user)) {
    const error = new Error('User cannot participate in giveaway twice');
    error.status = 480;
    throw error;
  }
  if (await giveaway.countParticipants() === giveaway.participantsLimit) {
    const error = new Error('Giveaway limit reached');
    error.status = 490;
    throw error;
  }
  await virtualTransactionService.createTransaction({
    type: 'toGiveaway',
    amountInUsd: giveaway.costByParticipant,
  }, user.id, giveaway);
  await giveaway.addParticipants(user);
  await giveaway.reload();
  return giveaway;
};

const uploadPhoto = async (body, file) => {
  const giveaway = await models.GiveawayModel.findOne({
    where: { id: body.giveawayID },
    include: [{
      model: models.ProductModel,
      as: 'product',
      attributes: ['id', 'photos'],
    }],
  });
  if (!giveaway) {
    const error = new Error('Giveaway not found');
    error.status = 404;
    throw error;
  }
  const array = giveaway.product.photos;
  const data = await s3.upload(file.buffer, body.giveawayID, `${body.index - 1}.${file.mimetype.split('/')[1]}`);
  array[body.index - 1] = data.Location;
  await giveaway.product.update({ photos: array });
  await giveaway.update({ status: 'inited' });
  return giveaway;
};

const deleteGiveaway = async (giveawayId, userId) => {
  const giveaway = await models.GiveawayModel.findByPk(giveawayId);
  if (!giveaway) {
    const error = new Error('Giveaway not found');
    error.status = 404;
    throw error;
  }
  if (giveaway.ownerId !== userId) {
    const error = new Error('User cannot delete this giveaway');
    error.status = 401;
    throw error;
  }
  await giveaway.destroy();
  return giveaway;
};

module.exports = {
  doGiveaway,
  getGiveaways,
  getGiveaway,
  createGiveaway,
  addGiveawayParticipant,
  deleteGiveaway,
  uploadPhoto,
};
