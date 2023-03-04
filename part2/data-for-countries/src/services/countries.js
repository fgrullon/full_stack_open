import axios from 'axios';

const getAll = () => {
    return axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => response.data);
}


const getCountry = country => {
    return axios
    .get(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.data);
}

export default { getAll, getCountry };