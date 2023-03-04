import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Countries from './components/Countries';
import Country from './components/Country';



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
