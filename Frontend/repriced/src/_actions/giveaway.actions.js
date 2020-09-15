import { giveawayConstants } from '../_constants';
import { giveawayService } from '../_services';
import { alertActions } from '.';
import { history } from '../helpers';

export const giveawayActions = {
    createGiveaway,
    getAll,
    getGiveaway, 
    delete: _delete,
    addGiveawayParticipant,
    findGiveawayWinner,
    productDelivered,
    filterList,
    uploadPhoto,
};

function createGiveaway(giveaway) {
    return dispatch => {
        dispatch(request({ giveaway }));
        giveawayService.createGiveaway(giveaway)
        .then(
            ga => {
                dispatch(success(ga));
                history.push('/giveaway');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    }

        function request(giveaway) { return { type: giveawayConstants.CREATE_REQUEST, giveaway } }
        function success(giveaway) { return { type: giveawayConstants.CREATE_SUCCESS, giveaway } }
        function failure(error)    { return { type: giveawayConstants.CREATE_FAILURE, error } }

}

function uploadPhoto(formData) {
    return dispatch => {
        dispatch(request({ formData }));
        giveawayService.uploadPhoto(formData)
        .then(
            ga => {
                dispatch(success(ga));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    }

        function request(giveaway) { return { type: giveawayConstants.UPLOAD_PHOTO_REQUEST, giveaway } }
        function success(giveaway) { return { type: giveawayConstants.UPLOAD_PHOTO_SUCCESS, giveaway } }
        function failure(error)    { return { type: giveawayConstants.UPLOAD_PHOTO_FAILURE, error } }

}

function getAll() {
    return dispatch => {
        dispatch(request());
        giveawayService.getAll()
        .then((giveawaysList) => {
                dispatch(success(giveawaysList.data));
                history.push('/giveaways')
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

function addGiveawayParticipant(id) {
    return dispatch => {
        dispatch(request({ id }));
        giveawayService.addGiveawayParticipant(id)
        .then(
            giveaway => {
                dispatch(success(giveaway.data));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
        function request(giveawayId) { return { type: giveawayConstants.ADD_PARTICIPANT_REQUEST, giveawayId } }
        function success(giveaway) { return { type: giveawayConstants.ADD_PARTICIPANT_SUCCESS, giveaway } }
        function failure(error)    { return { type: giveawayConstants.ADD_PARTICIPANT_FAILURE, error } }
}

function findGiveawayWinner(giveaway) {
    return dispatch => {
        dispatch(request({ giveaway }));
        let newGiveaway = giveaway;
        giveawayService.findGiveawayWinner(giveaway.id)
        .then(
            winnerId => {
                newGiveaway.winner_id = winnerId.data.winnerId;
                newGiveaway.status = 'winnerSelected';
                dispatch(success(newGiveaway));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
        function request(giveaway) { return { type: giveawayConstants.FIND_WINNER_REQUEST } }
        function success(giveaway) { return { type: giveawayConstants.FIND_WINNER_SUCCESS, giveaway } }
        function failure(error)    { return { type: giveawayConstants.FIND_WINNER_FAILURE, error } }
}

function _delete(giveaway) {
    
}

function productDelivered(giveaway) {
    return dispatch => {
        dispatch(request({ giveaway }));
        let newGiveaway = giveaway;
        giveawayService.productDelivered(giveaway.id)
        .then(
            ga => {
                newGiveaway.status = 'productDelivered';
                dispatch(success(newGiveaway));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        )
    }
        function request() { return { type: giveawayConstants.DELIVERED_REQUEST } }
        function success(giveaway) { return { type: giveawayConstants.DELIVERED_SUCCESS, giveaway } }
        function failure(error)    { return { type: giveawayConstants.DELIVERED_FAILURE, error } }
}

function filterList(selectedCategories, min_price, max_price, items, giveawaysList) {
    if ((selectedCategories == null || !selectedCategories.length) && (!max_price && !min_price)) {
        return dispatch => {
            dispatch(getAll());
        }
    } else {
        return dispatch => {
            dispatch(request());
            try {
                const filteredList = giveawayService.filterList(selectedCategories, min_price, max_price, items);
                dispatch(success(filteredList, giveawaysList));
            } catch (error) {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }       
        }
            function request() { return { type: giveawayConstants.FILTER_REQUEST } }
            function success(filteredList, giveawaysList) { return { type: giveawayConstants.FILTER_SUCCESS, filteredList, giveawaysList } }
            function failure(error)    { return { type: giveawayConstants.FILTER_FAILURE, error } }
    }
}