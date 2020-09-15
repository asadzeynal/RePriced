const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const UserModel = require('./user')(sequelize, Sequelize);
const TempUserModel = require('./tempUser')(sequelize, Sequelize);
const GiveawayModel = require('./giveaway')(sequelize, Sequelize);
const WalletModel = require('./wallet')(sequelize, Sequelize);
const GiveawayWalletModel = require('./giveawayWallet')(sequelize, Sequelize);
const VirtualTransactionModel = require('./virtualTransaction')(sequelize, Sequelize);
const RealTransactionModel = require('./realTransaction')(sequelize, Sequelize);
const ProductModel = require('./product')(sequelize, Sequelize);
const TokenModel = require('./token')(sequelize, Sequelize);
const MessageModel = require('./message')(sequelize, Sequelize);
const ConversationModel = require('./conversation')(sequelize, Sequelize);
const GiveawayElasticExportModel = require('./giveawayElasticExport')(sequelize, Sequelize);

const models = {
  UserModel,
  GiveawayModel,
  WalletModel,
  GiveawayWalletModel,
  VirtualTransactionModel,
  RealTransactionModel,
  ProductModel,
  TempUserModel,
  TokenModel,
  MessageModel,
  ConversationModel,
  GiveawayElasticExportModel,
};

//to use sql queries from sequelize
models.sequelize = sequelize;
models.Sequelize = Sequelize;

UserModel.hasOne(WalletModel, { as: 'wallet', foreignKey: { name: 'owner_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
UserModel.hasOne(TokenModel, { as: 'token', foreignKey: { name: 'user_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
VirtualTransactionModel.belongsTo(WalletModel, { as: 'wallet', foreignKey: { name: 'wallet_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
VirtualTransactionModel.belongsTo(GiveawayWalletModel, { as: 'giveawayWallet', foreignKey: { name: 'giveaway_wallet_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
WalletModel.hasMany(RealTransactionModel, { as: 'realTransactions', foreignKey: { name: 'wallet_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
GiveawayModel.hasOne(GiveawayWalletModel, { as: 'wallet', foreignKey: { name: 'giveaway_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
UserModel.hasMany(GiveawayModel, { as: 'createdGiveaways', foreignKey: { name: 'owner_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
GiveawayModel.belongsTo(UserModel, { as: 'owner', foreignKey: { name: 'owner_id', required: true, allowNull: false }, onDelete: 'CASCADE' });
UserModel.belongsToMany(GiveawayModel, { through: 'giveaway_participants', as: 'participatingGiveaways', foreignKey: 'user_id' });
GiveawayModel.belongsToMany(UserModel, { through: 'giveaway_participants', as: 'participants', foreignKey: 'giveaway_id' });
GiveawayModel.belongsTo(UserModel, { as: 'winner', foreignKey: 'winner_id' });
UserModel.hasMany(GiveawayModel, { as: 'wonGiveaways', foreignKey: { name: 'winner_id' } });
GiveawayModel.belongsTo(ProductModel, { as: 'product', foreignKey: 'product_id' });
MessageModel.belongsTo(UserModel, { as: 'from', foreignKey: { name: 'user_id', required: true, allowNull: false } });
UserModel.belongsToMany(UserModel, {
  through: { model: ConversationModel }, as: 'user1', foreignKey: 'user_1_id', required: true, allowNull: false,
});
UserModel.belongsToMany(UserModel, {
  through: { model: ConversationModel }, as: 'user2', foreignKey: 'user_2_id', required: true, allowNull: false,
});
ConversationModel.belongsTo(UserModel, {
  as: 'user1', foreignKey: { name: 'user_1_id', required: true, allowNull: false }
});
ConversationModel.belongsTo(UserModel, {
  as: 'user2', foreignKey: { name: 'user_2_id', required: true, allowNull: false }
});
MessageModel.belongsTo(ConversationModel, {
  as: 'conversation', foreignKey: { name: 'conversation_id', required: true, allowNull: false },
});
ConversationModel.hasMany(MessageModel, {
  as: 'messages', foreignKey: { name: 'conversation_id', required: true, allowNull: false },
});
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
