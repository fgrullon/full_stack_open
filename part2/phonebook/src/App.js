import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonFilter from './components/PersonFilter';
import person from './services/persons';

const App = () => {
  // const [persons, setPersons] = useState([{name : 'Arto Hellas'}]);
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setfilteredPersons] = useState(persons);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.filter(e => e.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return ;
    }

    person.create({name : newName, number : newNumber}).then(data => {
      const newPersons = persons.concat(data)
      setPersons(newPersons);
      setfilteredPersons(newPersons);
    });

    
  }

  const handleFilter = (event) => {
    const newPersons = persons.filter((e) => e.name.toLowerCase().includes(event.target.value))

    setfilteredPersons(newPersons);
  }

  useEffect(() => {
    person.getAll().then(data => {
      setPersons(data);
      setfilteredPersons(data);
    });


  }, []);

  const removePerson = (p) => {
    if(window.confirm(`Delete ${p.name}?`)){
      person.remove(p.id)
    }
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
      <Persons persons={filteredPersons} handleDelete={removePerson} />
    </div>
  );
}

export default App;
