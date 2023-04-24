import {useEffect, useState} from 'react';
import Dairy from './components/Dairy';
import { getAllEntries } from './services/dairyService';
import { Entry } from './types';
const App = () => {
  const [Entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    getAllEntries().then(data => setEntries(data));
  },[]);

  return (
    <Dairy entries={Entries} />
  );
}

export default App;
