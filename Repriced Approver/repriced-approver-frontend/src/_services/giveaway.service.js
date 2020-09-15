import axios from 'axios';
axios.defaults.withCredentials = false;

export const giveawayService = {
    getAll,
    getGiveaway
};


async function getAll() {
    try {
        return axios.get(`${process.env.REACT_APP_GIVEAWAYS_API}`)
    } catch (error) {
        console.log(error);
    }
}

function getGiveaway(id) {
    try {
        return axios.get(`${process.env.REACT_APP_GIVEAWAYS_API}` + id);
    } catch (error) {
        console.log(error);
    }
}




