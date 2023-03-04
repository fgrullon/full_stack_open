
const Countries = ({ countries }) => {
    if(countries.length > 10){
      return <div>Too many matches, specify another filter</div>
    }
    return (
      countries.map(country =>  <li key={country.cca3}> {country.name.official} </li>)
    );
  
}

export default Countries;