import { useState, useEffect } from 'react';
import axios from 'axios';
import countryService from './services/countries';

const Country = ({ countries }) => {
    const country = countries[0];
    const languages = Object.values(country.languages);
   console.log(country)
    return(
      <div>
        <h1>{ country.name.common }</h1>
        <div>capital { country.capital[0]}</div>
        <div>area { country.area }</div>

        <h4>languages:</h4>
        <ul>
          {
            languages.map(lang => <li key={lang}>{lang}</li>)
          }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );

}


const Countries = ({ countries }) => {
  if(countries.length > 10){
    return <div>Too many matches, specify another filter</div>
  }
  return (
    countries.map(country =>  <li key={country.cca3}> {country.name.official} </li>)
  );

}
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState();

  useEffect(() => {
    if(searchCountry){
      countryService
        .getCountry(searchCountry)
        .then(countries => {
          setCountries(countries);
        }).catch(error => {
          console.log(error)
          setCountries([]);
        });
    }else{
      countryService
        .getAll()
        .then(countries => {
          setCountries(countries);
        }).catch(error => {
          console.log(error);
          setCountries([]);
        });
    }

  },[searchCountry]);

  const handleFilter = (event) => {
    setSearchCountry(event.target.value);
  }

  return (
    <>
    <div>
      find countries <input onChange={handleFilter}/>


    </div>
      {(countries.length === 1 
      ?<Country countries={countries} />
      : <Countries countries={countries} />
      )}
    </>
  );
}

export default App;
