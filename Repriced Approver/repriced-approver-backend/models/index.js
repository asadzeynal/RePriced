const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const UserModel = require('./user')(sequelize, Sequelize);
const GiveawayModel = require('./giveaway')(sequelize, Sequelize);
const ProductModel = require('./product')(sequelize, Sequelize);
const GiveawayElasticExportModel = require('./giveawayElasticExport')(sequelize, Sequelize);

const models = {
  UserModel,
  GiveawayModel,
  ProductModel,
  GiveawayElasticExportModel
};

UserModel.hasMany(GiveawayModel, { as: 'createdGiveaways', foreignKey: { name: 'owner_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
GiveawayModel.belongsTo(UserModel, { as: 'owner', foreignKey: { name: 'owner_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
UserModel.belongsToMany(GiveawayModel, { through: 'giveaway_participants', as: 'participatingGiveaways', foreignKey: 'user_id' });
GiveawayModel.belongsToMany(UserModel, { through: 'giveaway_participants', as: 'participants', foreignKey: 'giveaway_id' });
GiveawayModel.belongsTo(UserModel, { as: 'winner', foreignKey: 'winner_id' });
GiveawayModel.belongsTo(ProductModel, { as: 'product', foreignKey: 'product_id' });
GiveawayElasticExportModel.belongsTo(GiveawayModel, { as: 'giveaway', foreignKey: { name: 'giveaway_id', required: true, allowNull: false } });


GiveawayModel.afterSave(async (giveaway) => {
  try {
    await GiveawayElasticExportModel.create({ giveaway_id: giveaway.id, operation: 'insert' });
  } catch (error) {
    console.log(error);
  }
});

GiveawayModel.afterUpdate(async (giveaway) => {
  try {
    await GiveawayElasticExportModel.create({ giveaway_id: giveaway.id, operation: 'update' });
  } catch (error) {
    console.log(error);
  }
});

GiveawayModel.afterDestroy(async (giveaway) => {
  try {
    await GiveawayElasticExportModel.create({ giveaway_id: giveaway.id, operation: 'delete' });
  } catch (error) {
    console.log(error);
  }
});

ProductModel.afterUpdate(async (product) => {
  try {
    const giveaway = await GiveawayModel.findOne({ where: { product_id: product.id } });
    await GiveawayElasticExportModel.create({ giveaway_id: giveaway.id, operation: 'update' });
  } catch (error) {
    console.log(error);
  }
});
module.exports = models;
