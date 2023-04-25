import {useEffect, useState} from 'react';
import Dairy from './components/Dairy';
import { getAllEntries } from './services/dairyService';
import { Entry } from './types';
import EntryForm from './components/EntryForm';
const App = () => {
  const [Entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    getAllEntries().then(data => setEntries(data));
  },[]);

  return (
  <>
    <EntryForm />
    <Dairy entries={Entries} />
  </>

  );
}

export default App;
