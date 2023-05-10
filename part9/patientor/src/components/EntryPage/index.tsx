
import { Entry } from '../../types';
import { Diagnosis } from "../../types";
import diagnoseService from '../../services/diagnoseService'
import { useState, useEffect } from 'react';
import { isString } from '../../utils';

interface Props {
    entry: Entry;
}
  
const EntryPage = ({ entry }: Props) => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const updateDiagnoses = async (codes: string[]) => {
        const newCodes: Diagnosis[] = [];
        codes.forEach(code =>  await diagnoseService.getByCode(code).then(r => newCodes.push(r)));

        setDiagnoses(newCodes)
    }

    useEffect(() => {

 
  
        if (Array.isArray(entry.diagnosisCodes) && entry.diagnosisCodes.length > 0) {
            void updateDiagnoses(entry.diagnosisCodes)
        }
        
  
      }, []);
  
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
                    diagnoses.map(d => <li key={d.code}>{d.code} - {d.name}</li>) 
                }
            </ul>
        </>

    )
}

export default EntryPage;