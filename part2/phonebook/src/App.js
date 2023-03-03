import { useState } from 'react';

const Number = ({ person }) => {
  return (
    <li>{ person.name } { person.number }</li>
  );
}
const Numbers = ({ persons }) => {
  return(
    persons.map(person => <Number key={person.name} person={person} />)
  );
}

const App = () => {
  // const [persons, setPersons] = useState([{name : 'Arto Hellas'}]);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setfilteredPersons] = useState(persons);
  

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.filter(e => e.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return ;
    }
    const newPersons = persons.concat({name : newName, number : newNumber});
    setPersons(newPersons);
    setfilteredPersons(newPersons);
  }

  const handleFilter = (event) => {
    const newPersons = persons.filter((e) => e.name.toLowerCase().includes(event.target.value))

    setfilteredPersons(newPersons);
  }
  return (
    <div>
      <h2>PhoneBook</h2>
      <div>
          filter shown with: <input onChange={handleFilter} />
        </div>
        <h2>add a new</h2>

      <form  onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </div>
  );
}

export default App;
