import { messengerConstants } from '../_constants';
import { alertActions } from '.';
import { apiUrl } from '../_services/config';
import io from 'socket.io-client';

export const messengerActions = {
    connect,
    sendMessage,
    getChat,
    getConversationList,
    getMessages
};

const socket = io(apiUrl);

function connect() {
    return dispatch => {
        dispatch(request());
        socket.connect();
        socket.on('connect_error', function (error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        });
        socket.on('connect', function () {
            dispatch(success(socket));
        });

        socket.on('message', (message) => {
            dispatch(incomingMessage(message));
        });
        socket.on('conversation', (conversation) => {
            dispatch(priorConversation(conversation));
        });
        socket.on('conversationList', (list) => {
            dispatch(conversationList(list));
        });
        socket.on('messageDelivered', (message) => {
            dispatch(messageDelivered(message));
        });
        socket.on('messages', (messagesListResponse) => {
            dispatch(messages(messagesListResponse));
        });
    };

    function request() { return { type: messengerConstants.CONNECT_REQUEST } }
    function success(socket) { return { type: messengerConstants.CONNECT_SUCCESS, socket } }
    function failure(error) { return { type: messengerConstants.CONNECT_FAILURE, error } }
    function incomingMessage(message) { return { type: messengerConstants.INCOMING_MESSAGE, message } }
    function messageDelivered(message) { return { type: messengerConstants.MESSAGE_DELIVERED, message } }
    function priorConversation(priorConversation) { return { type: messengerConstants.PRIOR_CONVERSATION, priorConversation } }
    function conversationList(conversationList) { return { type: messengerConstants.CONVERSATION_LIST, conversationList } }
    function messages(messagesListResponse) { return { type: messengerConstants.GET_MESSAGES_SUCCESS, messagesListResponse } }

}

function sendMessage(body, toId) {
    return dispatch => {
        socket.emit('sendMessage', body, toId);
        dispatch(messageSent());
    }
    function messageSent() { return { type: messengerConstants.MESSAGE_SENT } }
}

function getChat(recieverId) {
    return dispatch => {
        socket.emit('conversation', recieverId);
        dispatch(request())
    }

    function request() { return { type: messengerConstants.GET_CHAT_REQUEST } }
}

function getMessages(conversationId, cursor, limit) {
    return dispatch => {
        socket.emit('getMessages', conversationId, cursor, limit);
        dispatch(request(conversationId, cursor, limit));
    }

    function request(conversationId, cursor, limit) {
        return {
            type: messengerConstants.GET_MESSAGES_REQUEST, conversationId, cursor, limit
        }
    }

}
function getConversationList() {
    return dispatch => {
        socket.emit('conversationList');
        dispatch(request);
    }
    function request() { return { type: messengerConstants.CONVERSATION_LIST_REQUEST } }
}

