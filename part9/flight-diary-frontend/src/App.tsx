import {useEffect, useState} from 'react';
import Dairy from './components/Dairy';
import { Entry, NewEntry, Message } from './types';
import EntryForm from './components/EntryForm';
import dairyService from './services/dairyService';
import Notification from './components/Notification';

const App = () => {
  const [Entries, setEntries] = useState<Entry[]>([])
  const [message, setMessage] = useState<Message>()

  useEffect(() => {
    const fetchEntries = async () => {
      const result = await dairyService.getAllEntries();
      setEntries(result);
    };
    void fetchEntries();
  },[]);

  const handleSubmit = async (values: NewEntry) => {
  
    try {
      const result = await dairyService.createEntry(values);

      setEntries(Entries.concat(result));
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
