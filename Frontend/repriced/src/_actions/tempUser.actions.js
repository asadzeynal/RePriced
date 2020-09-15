import { tempUserConstants } from '../_constants';
import { tempUserService } from '../_services';
import { alertActions } from '.';
import { history } from '../helpers';

export const tempUserActions = {
    getMe
};

function getMe() {
    return dispatch => {
        dispatch(request());
        tempUserService.getMe()
            .then(
                tempUser => {
                    dispatch(success(tempUser.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tempUser) { return { type: tempUserConstants.GET_REQUEST } }
    function success(tempUser) { return { type: tempUserConstants.GET_SUCCESS, tempUser } }
    function failure(error) { return { type: tempUserConstants.GET_FAILURE, error } }
}

