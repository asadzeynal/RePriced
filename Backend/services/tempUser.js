const models = require('../models');

const getTempUser = async (query) => {
  const user = await models.TempUserModel.findOne({ where: query });
  return user;
};

const deleteTempUser = async (id) => {
  await models.TempUserModel.destroy({ where: { id } });
};

module.exports = {
  getTempUser,
  deleteTempUser,
};
