const messengerService = require('../services/messenger');

module.exports = (io, client) => {
  io.on('connection', (socket) => {
    const userId = socket.request.user.id;
    const socketId = socket.id;
    client.set(`userSocket:${userId}`, socketId);

    socket.on('conversation', async (recieverId) => {
      let conversation = await messengerService.getConversation(userId, recieverId);
      if (!conversation) {
        conversation = await messengerService.createConversation(userId, recieverId);
      }
      io.to(socketId).emit('conversation', conversation.dataValues);
    });

    socket.on('conversationList', async () => {
      try {
        const list = await messengerService.getUserConversations(userId);
        client.get(`userSocket:${userId}`, (err, sendSocketId) => {
          io.to(sendSocketId).emit('conversationList', { conversationList: list });
        });
      } catch (error) {
        console.log(error);
      }
    });

    // If body.conversation_id is empty, it means that the message is first
    // in the conversation and toId is required.
    socket.on('sendMessage', async (body, toId) => {
      const message = body;
      let recieverId = toId;
      message.user_id = userId;
      let conversation;
      try {
        if ((message.conversation_id === undefined || message.conversation_id === null)
          && recieverId !== undefined && recieverId !== null) {
          conversation = await messengerService.getConversation(userId, recieverId);
          if (!conversation) {
            conversation = await messengerService.createConversation(userId, recieverId);
          }
          message.conversation_id = conversation.id;
        }
        const savedMessage = await messengerService.createMessage(message);
        if (!conversation) {
          conversation = await savedMessage.getConversation();
        }
        if (!recieverId) {
          if (userId === conversation.user_1_id) {
            recieverId = conversation.user_2_id;
          } else if (userId === conversation.user_2_id) {
            recieverId = conversation.user_1_id;
          }
        }
        client.get(`userSocket:${recieverId}`, (err, sendSocketId) => {
          io.to(sendSocketId).emit('message', savedMessage);
        });
        client.get(`userSocket:${userId}`, (err, sendSocketId) => {
          io.to(sendSocketId).emit('messageDelivered', savedMessage);
        });
      } catch (e) {
        console.log(e);
      }
    });
    socket.on('getMessages', async (conversationId, cursor, limit) => {
      const messages = await messengerService.getMessages(conversationId, cursor, limit);
      client.get(`userSocket:${userId}`, (err, sendSocketId) => {
        io.to(sendSocketId).emit('messages', messages);
      });
    });
  });
};
