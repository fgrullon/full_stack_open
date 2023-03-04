
const Country = ({ country }) => {

  const languages = Object.values(country.languages);

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

export default Country;