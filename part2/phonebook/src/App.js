import { useState } from 'react';

const Number = ({ person }) => {
  return (
    <li>{ person.name }</li>
  );
}
const Numbers = ({ persons }) => {
  return(
    persons.map(person => <Number key={person.name} person={person} />)
  );
}

const App = () => {
  const [persons, setPersons] = useState([{name : 'Arto Hellas'}]);

  const [newName, setNewName] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat({name : newName}));
    console.log(persons)
  }
  return (
    <div>
      <h2>PhoneBook</h2>
      <form  onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
}

export default App;
