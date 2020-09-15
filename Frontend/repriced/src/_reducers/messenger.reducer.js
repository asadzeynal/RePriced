import { messengerConstants } from '../_constants';

export function messenger(state = {}, action) {
  switch (action.type) {
    case messengerConstants.CONNECT_REQUEST:
      return {
        ...state,
      };
    case messengerConstants.CONNECT_SUCCESS:
      return {
        ...state,
        socket: action.socket,
      };
    case messengerConstants.CONNECT_FAILURE:
      return {
        ...state,
      };
    case messengerConstants.INCOMING_MESSAGE:
      return {
        ...state,
        incomingMessage: action.message,
      };
    case messengerConstants.MESSAGE_DELIVERED:
      return {
        ...state,
        deliveredMessage: action.message,
      };
    case messengerConstants.MESSAGE_SENT:
      return {
        ...state,
      };
    case messengerConstants.PRIOR_CONVERSATION:
      return {
        ...state,
        priorConversation: action.priorConversation,
        priorConversationLoading: false,
      };
    case messengerConstants.CONVERSATION_LIST:
      return {
        ...state,
        conversationList: action.conversationList.conversationList,
      };
      case messengerConstants.GET_MESSAGES_REQUEST:
      return {
        ...state,
        loadingMessagesPage: {
          conversationId: action.conversationId,
          cursor: action.cursor,
          limit: action.limit,
        },
      };
      case messengerConstants.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messagesListResponse: action.messagesListResponse,
      };
      case messengerConstants.GET_CHAT_REQUEST: 
      return {
        ...state,
        priorConversationLoading: true,
      }
    default:
      return state
  }
}