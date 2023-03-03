import { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonFilter from './components/PersonFilter';
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
   
      <PersonFilter
        handleFilter={handleFilter}
      />

      <PersonForm 
        handleSubmit={handleSubmit} setNewName={setNewName} 
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;
