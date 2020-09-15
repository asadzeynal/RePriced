const { Op } = require('sequelize');
const models = require('../models');

const getConversation = async (user1Id, user2Id) => {
  const conversation = await models.ConversationModel.findOne(
    {
      where: {
        [Op.or]: [{
          user_1_id: user1Id, user_2_id: user2Id,
        },
        {
          user_1_id: user2Id, user_2_id: user1Id,
        }],
      },
      // include: {
      //   model: models.MessageModel,
      //   as: 'messages',
      //   limit: 10,
      //   offset: 1,
      //   order: [['created_at', 'asc']],
      // },
      // order: [[{ model: models.MessageModel, as: 'messages' }, 'created_at', 'ASC']],
    },
  );
  const nextCursor = await conversation.getMessages({ limit: 1, order: [['created_at', 'desc']] });
  conversation.dataValues.nextCursor = nextCursor[0].dataValues.id;
  return conversation;
};

const getUserConversations = async (user1Id) => {
  const list = await models.ConversationModel.findAll({
    where: {
      [Op.or]: [{ user_1_id: user1Id }, { user_2_id: user1Id }],
    },
    include: [
      {
        model: models.UserModel,
        as: 'user1',
        attributes: ['id', 'firstName', 'lastName', 'photo'],
        where: { id: { [Op.not]: user1Id } },
        required: false,
      },
      {
        model: models.UserModel,
        as: 'user2',
        attributes: ['id', 'firstName', 'lastName', 'photo'],
        where: { id: { [Op.not]: user1Id } },
        required: false,
      },
      {
        model: models.MessageModel,
        as: 'messages',
        limit: 1,
        order: [['created_at', 'desc']],
      },
    ],
  });
  return list;
};

const createConversation = async (user1Id, user2Id) => {
  const conversation = await models.ConversationModel.create({
    user_1_id: user1Id,
    user_2_id: user2Id,
  });
  return conversation;
};

const createMessage = async (body) => {
  const message = await models.MessageModel.create(body);
  return message;
};

const getMessages = async (conversationId, cursor, limit) => {
  const conversation = await models.ConversationModel.findOne({ where: { id: conversationId } });
  const messages = await conversation.getMessages({
    where: { id: { [Op.lte]: cursor } },
    limit: limit + 1,
    order: [['created_at', 'desc']],
  });
  const response = {
    nextCursor: null,
    messages,
  };
  if (messages[limit]) {
    response.nextCursor = messages[limit].id;
    messages.splice(limit, 1);
  }
  response.messages = messages.reverse();
  return response;
};

module.exports = {
  getConversation,
  getUserConversations,
  createConversation,
  createMessage,
  getMessages,
};
