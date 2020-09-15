import axios from 'axios';
import { apiUrl } from './config';
axios.defaults.withCredentials = true;

export const giveawayService = {
    createGiveaway,
    getAll,
    getGiveaway, 
    delete: _delete,
    findGiveawayWinner,
    addGiveawayParticipant,
    productDelivered,
    filterList,
    uploadPhoto
};

async function createGiveaway(giveaway) {
    try {
        return axios.post(`${apiUrl }/giveaways`,  giveaway)
                .then((giveaway) => {
                    return giveaway;
                }); 
    } catch (error) {
        console.log('error', error)
    }
}

async function uploadPhoto(formData) {
    try {
        return axios.post(`${apiUrl }/giveaways/photos`,  formData)
                .then((giveaway) => {
                    return giveaway;
                }); 
    } catch (error) {
        console.log('error', error)
    }
}

async function getAll() {
    try {
        return axios.get(`${apiUrl }/giveaways`)   
    } catch (error) {
        console.log(error);
    }
  
}

function getGiveaway(id) {
    try {
        return axios.get(`${apiUrl }/giveaways/` + id);
    } catch (error) {
        console.log(error);
    }
}

function _delete() {

}

function addGiveawayParticipant(giveawayId) {
    try {
        return axios.post(`${apiUrl }/giveaways/` + giveawayId + '/users');
    } catch (error) {
        console.log(error);        
    }
}

function findGiveawayWinner(giveawayId) {
    try {
        return axios.patch(`${apiUrl }/giveaways/` + giveawayId, { status: 'winnerSelected' })
    } catch (error) {
        console.log(error)
    }
}

function productDelivered(giveawayId) {
    try {
        return axios.patch(`${apiUrl }/giveaways/` + giveawayId, { status: 'productDelivered' })
    } catch (error) {
        console.log(error)
    }
}

function filterList(selectedCategories, min_price, max_price, items) {
    let chosenCategories; 
    if (!(selectedCategories == null)) chosenCategories = selectedCategories.map(item => item.value)
    let filteredList = [];
    if (!(selectedCategories == null)) filteredList = items.filter(item => chosenCategories.indexOf(item.product.category) !== -1 && item);
    if (min_price && max_price) {
        filteredList = (filteredList.length) ? filteredList.filter(item => (item.costByParticipant >= min_price) && (item.costByParticipant <= max_price))
                                                            : items.filter(item => (item.costByParticipant >= min_price) && (item.costByParticipant <= max_price));
    } else {
        if (min_price) filteredList = (filteredList.length) ? filteredList.filter(item => item.costByParticipant >= min_price)
                                                            : items.filter(item => item.costByParticipant >= min_price)
        if (max_price) filteredList = (filteredList.length) ? filteredList.filter(item => item.costByParticipant <= max_price)
                                                            : items.filter(item => item.costByParticipant <= max_price)
    }

    if (!filteredList.length) {
        filteredList = [];
    } 

    return filteredList;
}