import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonFilter from './components/PersonFilter';
import person from './services/persons';
import Notification from './components/Notification';

const App = () => {
  // const [persons, setPersons] = useState([{name : 'Arto Hellas'}]);
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setfilteredPersons] = useState(persons);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState();
  const [message, setMessage] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const match = persons.filter(e => e.name === newName);

    if (match.length > 0) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`);
      person.update(match[0].id, {...match[0], number : newNumber} ).then(data => {
        const newPersons = persons.map(p => p.id !== match[0].id ? p : data);
        setPersons(newPersons);
        setfilteredPersons(newPersons);

        setMessage(`${match[0].name} Updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }else {

      person.create({name : newName, number : newNumber}).then(data => {
        const newPersons = persons.concat(data)
        setPersons(newPersons);
        setfilteredPersons(newPersons);
        setMessage(`Added ${data.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    
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
      <Notification message={message} />
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
