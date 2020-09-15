import { giveawayConstants } from '../_constants/giveaway.constant';

const initialState = {};

export function giveaway(state = initialState, action) {
    switch (action.type) {
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

        default:
            return state
    }
}
