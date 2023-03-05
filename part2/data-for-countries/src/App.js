import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Countries from './components/Countries';
import Country from './components/Country';



const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState();
  const [displayCountry, setDisplayCountry] = useState(null);

  useEffect(() => {
    if(searchCountry){
        countryService
        .getCountry(searchCountry)
        .then(countries => {
          setCountries(countries);
        }).catch(error => {
          setCountries([]);
        });

    }else{
      countryService
        .getAll()
        .then(countries => {
          setCountries(countries);
        }).catch(error => {
          setCountries([]);
        });
    }

  },[searchCountry]);

  const handleFilter = (event) => {
    setSearchCountry(event.target.value);
  }

  const handleShowCountry = (country) => {
    setDisplayCountry(country);
  }

  return (
    <>
    <div>
      find countries <input onChange={handleFilter}/>


    </div>
    <div>
      {(countries.length === 1 
      ?<Country country={countries[0]} />
      : <Countries countries={countries} handleShowCountry={handleShowCountry}/>
      )}
    </div>
    <div>
    {(displayCountry !== null ? <Country country={displayCountry} />  : '')}

    </div>
    </>

  );
}

export default App;
