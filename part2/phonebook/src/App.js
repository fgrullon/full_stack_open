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
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const match = persons.filter(e => e.name === newName);

    if (match.length > 0) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`);
      person.update(match[0]._id, {...match[0], number : newNumber} ).then(data => {
        const newPersons = persons.map(p => p._id !== match[0]._id ? p : data);
        setPersons(newPersons);
        setfilteredPersons(newPersons);
        setMessageType('success');
        setMessage(`${match[0].name} Updated`);
        setTimeout(() => {
          setMessage(null);
          setMessageType('');
        }, 5000);
      }).catch(error => {
        setMessageType('error');
        setMessage(`Information of ${match[0].name} has already been removed from server`);

        setTimeout(() => {
          setMessage(null);
          setMessageType('');
        }, 5000);
      });
    }else {

      person.create({name : newName, number : newNumber})
      .then(data => {
          const newPersons = persons.concat(data)
          setPersons(newPersons);
          setfilteredPersons(newPersons);
          setMessageType('success');
          setMessage(`Added ${data.name}`);
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setMessage(null);
            setMessageType('');
          }, 5000);

      }).catch(error => {
        setMessageType('error');
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
          setMessageType('');
        }, 5000);
      });
    }
    
  }

  const handleFilter = (event) => {
    const newPersons = persons.filter((e) => e.name.toLowerCase().includes(event.target.value.toLowerCase()));

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
      const id = p.id || p._id;
      person.remove(id)
      const newPersons = persons.filter(person => person._id !== p._id);

      setPersons(newPersons);
      setfilteredPersons(newPersons);
    }
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification type={messageType} message={message} />
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
