const models = require('../models');

const getUsers = async (query) => {
  const users = await models.UserModel.findAll({ where: query });
  return users;
};

//create inited giveaways

module.exports = {
  getUsers
};
