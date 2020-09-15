import { createStore, applyMiddleware, } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger({
    predicate: (getState, action) => {
        if(action !== undefined && action.type.includes('USERS_GET_ME')) {
            return false;
        } else {
            return true;
        }
    }
});

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ),
);

store.dispatch({
    type: 'USERS_LOGIN_FORM_HIDE',

});