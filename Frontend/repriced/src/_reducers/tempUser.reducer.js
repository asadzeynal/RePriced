import { tempUserConstants } from '../_constants';

export function tempUser(state = {}, action) {
  switch (action.type) {
    case tempUserConstants.GET_REQUEST:
      return {
        loading: true
      };
    case tempUserConstants.GET_SUCCESS:
      return {
        tempUser: action.tempUser,
        loading: false,
      };
    case tempUserConstants.GET_FAILURE:
      return { 
        error: action.error,
        loading: false,
      };
    default:
      return state
  }
}