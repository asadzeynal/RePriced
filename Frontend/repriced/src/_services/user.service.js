import axios from 'axios';
import { apiUrl } from './config';

axios.defaults.withCredentials = true;

// import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    confirmEmail,
    getMe,
    updateProfile,
    getUserGiveaways,
    getGiveawaysWonByUser,
    getParticipatingGiveaways,
    delete: _delete
};

function getParticipatingGiveaways() {
    try {
        return axios.get(`${apiUrl}/users/products/participant`)
        .then(gaList => {
            return gaList;
        });  
    } catch (error) {
        console.log(error);   
    }
}

function getGiveawaysWonByUser() {
    try {
        return axios.get(`${apiUrl}/users/products/winner`)
                    .then(gaList => {
                        return gaList;
                    });
    } catch (error) {
      console.log(error);   
    }
}

function getUserGiveaways() {
    try {
        return axios.get(`${apiUrl}/users/products/`)
                    .then(gaList => {
                        return gaList;
                    });
    } catch (error) {
      console.log(error);   
    }
}

function updateProfile(user) {
    try {
        return axios.put(`${apiUrl}/users/update/`, user)
                    .then(user => {
                        return user;
                    });
    } catch (error) {
        console.log(error);
    }
}

function getMe() {
    try {
        return axios.get(`${apiUrl}/users/me`)
            // .then(item => handleResponse(item))   
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user)); //TODO как сделать сессию
                return user;
            });
    } catch (error) {
        console.log(error);
    }
}

function login(email, password) {
    try {
        return axios.post(`${apiUrl}/auth`, { email, password })
            // .then(item => handleResponse(item))   
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user)); //TODO как сделать сессию
                return user;
            });
    } catch (error) {
        console.log(error);
    }

}

function confirmEmail(tokenHash) {
    try {
        return axios.post(`${apiUrl}/users/confirmation/`, { tokenHash })
            .then(user => {
                return user;
            });
    } catch (error) {
        console.log(error);
    }

}

function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
    console.log('logout')
}

function getAll() {
    console.log('getAll')
}

function getById(id) {
    console.log('getByID')
}

function register(user) {
    return axios.post(`${apiUrl}/users`, user);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    console.log('delete')
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}