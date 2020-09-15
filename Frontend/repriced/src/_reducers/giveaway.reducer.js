import { giveawayConstants } from '../_constants';

const initialState = {};

export function giveaway(state = initialState, action) {
  switch (action.type) {
    case giveawayConstants.CREATE_REQUEST:
      return {
        creatingGiveaway: true,
      };
    case giveawayConstants.CREATE_SUCCESS:
      return {
        giveaway: action.giveaway,
        creatingGiveaway: false,
      };
    case giveawayConstants.CREATE_FAILURE:
        return {
            creatingGiveaway: false,
        }
    

    case giveawayConstants.GETALL_REQUEST:
      return {
        loading: true,
        giveawaysList: action.giveawaysList,
      }
    case giveawayConstants.GETALL_SUCCESS:
      return {
        loading: false, 
        giveawaysList: action.giveawaysList,
      }
    case giveawayConstants.GETALL_FAILURE:
      return {
        loading: false,
      }


    case giveawayConstants.GET_REQUEST:
      return {
        loading: true,
        id: action.id,
      }
    case giveawayConstants.GET_SUCCESS:
      return {
        loading: false,
        giveaway: action.giveaway,
      }
    case giveawayConstants.GET_FAILURE:
      return {
        loading: false,
        error: action.error,
      }

    case giveawayConstants.FIND_WINNER_REQUEST:
      return {
        loading: true, 
      }
    case giveawayConstants.FIND_WINNER_SUCCESS:
      return {
        loading: false, 
        giveaway: action.giveaway,
      }
    case giveawayConstants.FIND_WINNER_FAILURE:
      return {
        loading: false,
        error: action.error,
    }

    case giveawayConstants.DELIVERED_REQUEST:
      return {
        loading: true, 
      }
    case giveawayConstants.DELIVERED_SUCCESS:
      return {
        loading: false, 
        giveaway: action.giveaway,
      }
    case giveawayConstants.DELIVERED_FAILURE:
      return {
        loading: false,
        error: action.error,
    }

    case giveawayConstants.FILTER_REQUEST:
      return {
        loading: true, 
      }
    case giveawayConstants.FILTER_SUCCESS:
      return {
        loading: false, 
        filteredList: action.filteredList,
        giveawaysList: action.giveawaysList,
      }
    case giveawayConstants.FILTER_FAILURE:
      return {
        loading: false,
        error: action.error,
    }

    default:
      return state
  }
}