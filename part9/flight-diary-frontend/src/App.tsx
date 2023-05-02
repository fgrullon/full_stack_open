import {useEffect, useState} from 'react';
import Dairy from './components/Dairy';
import { Entry, NewEntry } from './types';
import EntryForm from './components/EntryForm';
import dairyService from './services/dairyService';
import Notification from './components/Notification';
import axios from 'axios';

const App = () => {
  const [Entries, setEntries] = useState<Entry[]>([])
  const [error, setError] = useState<string>();

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
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
  <>
    <Notification error={error} />
    <EntryForm  onSubmit={handleSubmit} />
    <Dairy entries={Entries} />
  </>

  );
}

export default App;
