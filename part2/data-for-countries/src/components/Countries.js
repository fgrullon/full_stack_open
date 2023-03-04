
const Countries = ({ countries, handleShowCountry }) => {
    if(countries.length > 10){
      return <div>Too many matches, specify another filter</div>
    }
    return (
      countries.map(country =>  <li key={country.cca3}> {country.name.official} <button onClick={() => handleShowCountry(country)}>show</button></li>)
    );
  
}

export default Countries;