const crypto = require('crypto');
const mailer = require('../config/mailer');
const models = require('../models');

const getUsers = async (query) => {
  const users = await models.UserModel.findAll({ where: query });
  return users;
};

const getUser = async (query) => {
  const user = await models.UserModel.findOne({ where: query });
  return user;
};

const createUser = async (userBody) => {
  const body = userBody;
  body.dateOfBirth = new Date(userBody.dateOfBirth.year, userBody.dateOfBirth.month,
    userBody.dateOfBirth.day);
  if (!body.isApproved) {
    body.isApproved = false;
  }
  body.role = 'user';
  const user = await models.UserModel.create(body);
  await user.setWallet(new models.WalletModel());
  const token = new models.TokenModel({ hash: crypto.randomBytes(16).toString('hex') });
  await user.setToken(token);
  if (!user.isApproved) {
    await mailer.send({
      from: 'Repriced Support <noreply@repriced.ru>',
      to: user.email,
      subject: 'Welcome to Repriced. Verify Your Email',
      text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/repriced.ru\/confirmation\/' + token.hash + ' \n',
    });
  }
  return user;
};

const updateProfile = async (user) => {
  try {
    const result = await models.UserModel.update(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        gender: user.gender,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        county: user.county,
        city: user.city,
      },
      { where: { id: user.id } }
    )
    return result;
  } catch (error) {
    console.log(error)
  }

}

const deleteUser = async (id) => {
  await models.UserModel.destroy({ where: { id } });
};

const getUserProducts = async (user) => {
  const giveaways = await user.getCreatedGiveaways({ include: ['product'] });
  return giveaways;
};

const getGiveawaysWonByUser = async (user) => {
  try {
    const giveaways = await user.getParticipatingGiveaways({ include: ['product'] });
    return giveaways;  
  } catch (error) {
    throw error;
  } 
}

const getParticipatingGiveaways = async (user) => {
  try {
    const giveaways = await user.getWonGiveaways({ include: ['product'] });
    return giveaways;  
  } catch (error) {
    throw error;
  } 
}

const confirmEmail = async (tokenHash, sessUser) => {
  const token = await models.TokenModel.findOne({ where: { hash: tokenHash } });
  if (!token) {
    const error = new Error('Token not found');
    error.status = 404;
    throw error;
  }
  const user = await models.UserModel.findOne({ where: { id: token.user_id } });
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }
  if (user.email !== sessUser.email) {
    const error = new Error('Error');
    error.status = 400;
    throw error;
  }
  if (user.isApproved) {
    const error = new Error('User already verified');
    error.status = 400;
    throw error;
  }
  await user.update({ isApproved: true });
  return user;
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  getUserProducts,
  confirmEmail,
  updateProfile,
  getGiveawaysWonByUser,
  getParticipatingGiveaways,
};
