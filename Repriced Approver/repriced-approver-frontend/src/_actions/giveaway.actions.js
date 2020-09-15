import { giveawayConstants } from '../_constants/giveaway.constant';
import { giveawayService } from '../_services/giveaway.service';
import { alertActions } from './alert.actions';


export const giveawayActions = {
    getAll,
    getGiveaway
};





function getAll() {
    return dispatch => {
        dispatch(request());
        giveawayService.getAll()
            .then((giveawaysList) => {
                    dispatch(success(giveawaysList.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request() { return { type: giveawayConstants.GETALL_REQUEST } }
    function success(giveawaysList) { return { type: giveawayConstants.GETALL_SUCCESS, giveawaysList } }
    function failure(error) { return { type: giveawayConstants.GETALL_FAILURE, error } }
}



function getGiveaway(id) {
    return dispatch => {
        dispatch(request(id));
        giveawayService.getGiveaway(id)
            .then((giveaway) => {
                    dispatch(success(giveaway.data));
                },
                error => {
                    dispatch(failure(error.toString));
                    dispatch(alertActions.error(error.toString));
                });
    }

    function request(id) { return { type: giveawayConstants.GET_REQUEST, id } }
    function success(giveaway) { return { type: giveawayConstants.GET_SUCCESS, giveaway } }
    function failure(error) { return { type: giveawayConstants.GET_FAILURE, error } }
}









