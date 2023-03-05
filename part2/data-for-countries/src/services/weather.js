import axios from 'axios';

const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const api_key = `&appid=${process.env.REACT_APP_API_KEY}`;

const getWeather = country => {
 
    return axios
            .get(`${baseUrl}${country.name.common}${api_key}`)
            .then(response => response.data);
}



export default { getWeather };
