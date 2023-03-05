import { useState, useEffect } from 'react';
import CountryWeather from '../services/weather';

const Weather = ({ country }) => {

    const [weatherInfo, setWeatherInfo] = useState(null);

    useEffect(() => {

        CountryWeather.getWeather(country)
        .then(response =>  {
            setWeatherInfo(response);
        });
    
    },[country]);

        return(
            (
                weatherInfo ? 
                <>
                <h1>weather in { country.name.common }</h1>
                <div>temperature { weatherInfo.main.temp }</div>
                <img 
                    src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.weather.description}
                />
                <div >wind { weatherInfo.wind.speed } m/s</div>
                </>
                :
                <></>
            )
         
        );




}

export default Weather;