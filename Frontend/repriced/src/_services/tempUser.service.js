import axios from 'axios';
import { apiUrl } from './config';

axios.defaults.withCredentials = true;

export const tempUserService = {
    getMe,
};

function getMe() {
    try {
        return axios.get(`${apiUrl }/tempUsers/me`,)  
        .then(user => {
            return user;
        });    
    } catch (error) {
        console.log(error)
    }
    
}
