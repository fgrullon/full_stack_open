import {useEffect, useState} from 'react';
import Dairy from './components/Dairy';
import { getAllEntries } from './services/dairyService';
import { Entry } from './types';
import EntryForm from './components/EntryForm';
import { createEntry } from '../services/dairyService';

const App = () => {
  const [Entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    getAllEntries().then(data => setEntries(data));
  },[]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const values = {
      date,
      weather,
      visibility,
      comment
    }
    try {
      const entry = createEntry(values);
      setEntries(Entries.concat(entry));
    } catch (e: unknown) {
      console.error("Unknown error", e);
    }
  };

  return (
  <>
    <EntryForm  onSubmit={handleSubmit} />
    <Dairy entries={Entries} />
  </>

  );
}

export default App;
