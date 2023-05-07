
import { Entry } from '../../types';

interface Props {
    entry: Entry;
}
  
const EntryPage = ({ entry }: Props) => {

    if(!entry){
        return null;
    }

    return(
        <>
            <div>
                {entry.date} {entry.description}
            </div>
            <ul>
                { 
                    entry.diagnosisCodes && 
                    entry.diagnosisCodes.map(d => <li key={d}>{d}</li>) 
                }
            </ul>
        </>

    )
}

export default EntryPage;