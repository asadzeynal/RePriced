import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { history } from '../helpers';
import { func } from 'prop-types';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    confirmEmail,
    getMe,
    delete: _delete,
    loginForm,
    updateProfile,
    getUserGiveaways,
    getGiveawaysWonByUser,
    getParticipatingGiveaways,
};

function getParticipatingGiveaways() {
    return dispatch => {
        dispatch(request());
        userService.getParticipatingGiveaways()
            .then(
                participantOf => {
                    dispatch(success(participantOf.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request() { return { type: userConstants.GET_USER_PART_GA_REQUEST } }
    function success(participantOf) { return { type: userConstants.GET_USER_PART_GA_SUCCESS, participantOf } }
    function failure(error) { return { type: userConstants.GET_USER_PART_GA_FAILURE, error } }
}

function getGiveawaysWonByUser() {
    return dispatch => {
        dispatch(request());
        userService.getGiveawaysWonByUser()
            .then(
                winnerOf => {
                    dispatch(success(winnerOf.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request() { return { type: userConstants.GET_USER_WINNER_GA_SUCCESS } }
    function success(winnerOf) { return { type: userConstants.GET_USER_WINNER_GA_SUCCESS, winnerOf } }
    function failure(error) { return { type: userConstants.GET_USER_WINNER_GA_SUCCESS, error } }
}

function getUserGiveaways() {
    return dispatch => {
        dispatch(request());
        userService.getUserGiveaways()
            .then(
                userGa => {
                    dispatch(success(userGa.data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request() { return { type: userConstants.GET_USER_GA_REQUEST } }
    function success(userGa) { return { type: userConstants.GET_USER_GA_SUCCESS, userGa } }
    function failure(error) { return { type: userConstants.GET_USER_GA_FAILURE, error } }
}

function updateProfile(user) {
    return dispatch => {
        dispatch(request());
        userService.updateProfile(user)
            .then(
                user => {
                    dispatch(success());  
                    dispatch(getMe()); 
                    dispatch(getGiveawaysWonByUser()); 
                    dispatch(getParticipatingGiveaways()); 
                    dispatch(getUserGiveaways()); 
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.UPDATE_PROFILE_REQUEST } }
    function success() { return { type: userConstants.UPDATE_PROFILE_SUCCESS } }
    function failure(error) { return { type: userConstants.UPDATE_PROFILE_FAILURE, error } }
}


function getMe() {
    return dispatch => {
        dispatch(request());

        userService.getMe()
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.GET_ME_REQUEST } }
    function success(user) { return { type: userConstants.GET_ME_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_ME_FAILURE, error } }
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginForm(isShowed) {
    return dispatch => {
        if (isShowed === true) {
            dispatch(show())
        } else if (isShowed === false) {
            dispatch(hide())
        }
    }
    function show() { return { type: userConstants.LOGIN_FORM_SHOW } }
    function hide() { return { type: userConstants.LOGIN_FORM_HIDE } }
}

function confirmEmail(tokenHash) {
    return dispatch => {
        dispatch(request({ tokenHash }));
        userService.confirmEmail(tokenHash)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.EMAIL_CONFIRMATION_REQUEST, user } }
    function success(user) { return { type: userConstants.EMAIL_CONFIRMATION_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EMAIL_CONFIRMATION_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}