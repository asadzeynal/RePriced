import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_FORM_SHOW:
      return {
        ...state,
        showLoginForm: true,
      };
    case userConstants.LOGIN_FORM_HIDE:
      return {
        ...state,
        showLoginForm: false,
      };

    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case userConstants.GET_ME_REQUEST:
      return {
        ...state,
      };
    case userConstants.GET_ME_SUCCESS:
      return {
        ...state,
        authenticatedUser: action.user.data,
      };
    case userConstants.GET_ME_FAILURE:
      return {
        ...state,
        error: action.error,
        authenticatedUser: null,
      };

    case userConstants.EMAIL_CONFIRMATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.EMAIL_CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmationSuccess: true,
        loading: false,
      };
    case userConstants.EMAIL_CONFIRMATION_FAILURE:
      return {
        ...state,
        confirmationSuccess: false,
        loading: false,
      };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };

    case userConstants.UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case userConstants.UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
      }; 
    case userConstants.UPDATE_PROFILE_FAILURE:
      return {
        loading: false,
        error: action.error,
      }; 

    case userConstants.GET_USER_GA_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GET_USER_GA_SUCCESS:
      return {
        ...state,
        loading: false,
        createdBy: action.userGa,
      };
    case userConstants.GET_USER_GA_FAILURE:
      return {
        loading: false,
        error: action.error,
      };

    case userConstants.GET_USER_WINNER_GA_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GET_USER_WINNER_GA_SUCCESS:
      return {
        ...state,
        loading: false,
        winnerOf: action.winnerOf,
      };
    case userConstants.GET_USER_WINNER_GA_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    
    case userConstants.GET_USER_PART_GA_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GET_USER_PART_GA_SUCCESS:
      return {
        ...state,
        loading: false,
        participantOf: action.participantOf,
      };
    case userConstants.GET_USER_PART_GA_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state
  }
}